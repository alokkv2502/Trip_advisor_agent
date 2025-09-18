# agents/activities_agent.py (or directly inside agent.py if you prefer)

from google.adk.agents import LlmAgent
from .geoapify_tool import get_activities
from google.adk.tools import FunctionTool

# Initialize Geoapify Tool

activities_tool = FunctionTool(func=get_activities)

# Activities Agent
activities_agent = LlmAgent(
    name="ActivitiesAgent",
    model="gemini-2.5-flash-lite",
    description="Suggests activities and places to visit using Geoapify API.",
    tools=[activities_tool],
    output_key="activities",
    instruction="""
    Given a location (city, state, or country),
    fetch activities, tourist attractions, and entertainment options using Geoapify API.

    Input format:
    {
      "location": "<place>"
    }

    Output format:
    {
      "location": "<place>",
      "coordinates": {"lat": <lat>, "lon": <lon>},
      "activities": [
        {
          "name": "<place name>",
          "category": "<category>",
          "address": "<full address>",
          "lat": <lat>,
          "lon": <lon>,
          "rating": "<if available>",
          "details": "<if available>"
        }
      ]
    }
    """
    
    
)
root_agent = activities_agent