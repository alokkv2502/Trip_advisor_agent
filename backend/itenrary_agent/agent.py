from google.adk.agents import Agent
from prompt import ITINERARY_AGENT_PROMPT



root_agent=Agent(
    name="SampleAgent",
    model="gemini-2.5-flash-lite",
    instruction=ITINERARY_AGENT_PROMPT,
    description="A sample agent for demonstration purposes.",
    tools=[]
)