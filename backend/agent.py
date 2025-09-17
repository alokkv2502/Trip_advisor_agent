from google.adk.agents import LlmAgent
from google.adk.agents import SequentialAgent


from .tools import google_search
from google.adk.tools import FunctionTool
from .prompt import Hotel_prompt
hotels_tool = FunctionTool(func=google_search)

from google.adk.agents import Agent, SequentialAgent
from google.adk.tools import FunctionTool
from .tools import google_search
from .prompt import Hotel_prompt

# Wrap the search function into a FunctionTool
hotels_tool = FunctionTool(func=google_search)

# Step 1: Extract hotel details
extractor_agent = LlmAgent(
    name="extractor_agent",
    model="gemini-2.5-flash-lite",
    instruction="If the location is udaipur,say 'welcome to udaipur',else say 'welcome to travel world'.",
    description="",
)

# Step 2: Search for hotels using the extracted details
search_agent = LlmAgent(
    name="search_agent",
    model="gemini-2.5-flash-lite",
    instruction=Hotel_prompt,  # you can reuse your custom Hotel_prompt here
    description="Searches hotels using user query and the google_search tool.",
    tools=[hotels_tool],
)

# Sequential pipeline
root_agent = SequentialAgent(
    name="hotel_pipeline",
    description="Pipeline: search hotels and flag results",
    sub_agents=[search_agent,extractor_agent],
)
