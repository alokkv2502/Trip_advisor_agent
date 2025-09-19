from google.adk.agents import LlmAgent
from google.adk.agents import SequentialAgent


from google.adk.tools import FunctionTool

from google.adk.agents import Agent, SequentialAgent
from google.adk.tools import FunctionTool
from .prompt import FindHotels_prompt

from .test import find_hotels
from .agents.ActivitiesAgent.agent import root_agent as activities_agent
from .agents.conclusionAgent.agent import root_agent as conclusion_agent
from .agents.restaurants_agent.agent import root_agent as restaurants_agent

# Wrap the search function into a FunctionTool
hotels_tool = FunctionTool(func=find_hotels)

# Step 1: Extract hotel details


# Step 2: Search for hotels using the extracted details
hotels_agent = LlmAgent(
    name="find_hotels_agent",
    model="gemini-2.0-flash",
    instruction=FindHotels_prompt,  # you can reuse your custom Hotel_prompt here
    description="Fetches hotels near a given location using lat/lon and check-in/check-out dates.",
    tools=[hotels_tool],
    output_key="hotels_json"  
)

# Sequential pipeline
activities_hotels_pipeline = SequentialAgent(
    name="ActivitiesHotelsPipeline",
    sub_agents=[activities_agent, hotels_agent, restaurants_agent, conclusion_agent],
    description="""
Executes a structured travel planning pipeline:
1. Uses the ActivitiesAgent to fetch the top 5 activities for the destination.
2. For each activity, the HotelsAgent finds nearby hotels with key details (price, rating, amenities, location).
3. The RestaurantsAgent enriches the hotel context by retrieving nearby dining options.
4. The ConclusionAgent aggregates all results (activities, hotels, restaurants) into a clean, normalized JSON
   and generates multiple travel plan variations (Luxury, Premium, Balanced, Budget, Economy).
"""
)


# For ADK tools compatibility, root agent
root_agent = activities_hotels_pipeline
