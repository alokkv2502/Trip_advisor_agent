import logging
import traceback
import json
import re
import uuid
from fastapi import FastAPI, APIRouter, HTTPException, Body
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types
from contextlib import asynccontextmanager
from .agent import root_agent
import os,sys
# ---------------------------------------------------
# Configure logging
# ---------------------------------------------------
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("app")

APP_NAME = "Centralized_Content_Moderation"

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application starting up...")
    try:
        app.state.session_service = InMemorySessionService()
    except Exception as e:
        logger.error("Failed to initialize session service", exc_info=True)
    yield
    logger.info("Application shutting down...")

# FastAPI app
app = FastAPI(
    title="Banned_Content_Moderation",
    description="Multi-agent system for processing inputs",
    version="1.0.0",
    lifespan=lifespan
)

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

os.environ["GOOGLE_API_KEY"] = "AIzaSyDWz2wnDYV1eNDS3oOuYTamPkJiOHQmrrg"

# ---------------------------------------------------
# Debug-friendly /process endpoint
# ---------------------------------------------------
@router.post("/process")
async def process_input(input_text: str = Body(..., media_type="text/plain")):
    """
    Endpoint that accepts raw text in the body and processes it through the agent pipeline.
    """

    try:
        input_text = input_text.strip()
        if not input_text:
            raise HTTPException(status_code=400, detail="Empty input provided.")

        unique_id = str(uuid.uuid4())
        session_id = unique_id
        user_id = unique_id

        session_service = app.state.session_service

        try:
            current_session = await session_service.get_session(
                app_name=APP_NAME,
                user_id=user_id,
                session_id=session_id,
            )
        except Exception:
            current_session = None

        if current_session is None:
            await session_service.create_session(
                app_name=APP_NAME,
                user_id=user_id,
                session_id=session_id,
            )

        runner = Runner(
            app_name=APP_NAME,
            agent=root_agent,
            session_service=session_service,
        )

        user_message = types.Content(
            role="user", parts=[types.Part.from_text(text=input_text)]
        )

        try:
            events = runner.run_async(
                user_id=user_id,
                session_id=session_id,
                new_message=user_message,
            )
        except Exception as e:
            logger.exception("Runner failed while calling root_agent")
            raise HTTPException(status_code=500, detail=f"Runner error: {str(e)}")

        last_event_content = None

        async for event in events:
            if event.is_final_response():
                if event.content and event.content.parts:
                    last_event_content = event.content.parts[0].text

        if not last_event_content:
            raise HTTPException(status_code=500, detail="No final response from agent.")

        # Clean up ```json fences if present
        cleaned_response = re.sub(
            r"^```(?:json)?\n|```$",
            "",
            last_event_content.strip(),
            flags=re.IGNORECASE | re.MULTILINE,
        ).strip()

        try:
            parsed_json = json.loads(cleaned_response)
        except json.JSONDecodeError:
            parsed_json = {"response": cleaned_response}

        print(json.dumps(parsed_json, ensure_ascii=False,separators=(",", ":")),flush=True, file=sys.stdout)

        return {"result": parsed_json}

    except Exception:
        logger.exception("Processing failed")
        raise HTTPException(status_code=500, detail="Processing failed")



app.include_router(router, prefix="/api", tags=["Input Processing"])

