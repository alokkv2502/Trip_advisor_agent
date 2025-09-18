from google.adk.agents import LlmAgent
from google.adk.agents import SequentialAgent


from google.adk.tools import FunctionTool

from google.adk.agents import Agent, SequentialAgent
from google.adk.tools import FunctionTool
from .prompt import FindHotels_prompt

from .test import find_hotels
from .agents.ActivitiesAgent.agent import root_agent as activities_agent


# Wrap the search function into a FunctionTool
hotels_tool = FunctionTool(func=find_hotels)

# Step 1: Extract hotel details


# Step 2: Search for hotels using the extracted details
hotels_agent = LlmAgent(
    name="find_hotels_agent",
    model="gemini-2.5-flash",
    instruction=FindHotels_prompt,  # you can reuse your custom Hotel_prompt here
    description="Fetches hotels near a given location using lat/lon and check-in/check-out dates.",
    tools=[hotels_tool],
    output_key="hotels_json"  
)

# Sequential pipeline
activities_hotels_pipeline = SequentialAgent(
    name="ActivitiesHotelsPipeline",
    sub_agents=[activities_agent, hotels_agent],
    description="""
Runs a sequential pipeline:
1. Fetch top 5 activities using ActivitiesAgent
2. For each activity, fetch nearby hotels using FindHotelsAgent
3. Returns combined structured JSON for all activities and hotels
"""
)

# For ADK tools compatibility, root agent
root_agent = activities_hotels_pipeline
