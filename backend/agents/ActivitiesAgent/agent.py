# agents/activities_agent.py (or directly inside agent.py if you prefer)

from google.adk.agents import LlmAgent
from .geoapify_tool import get_activities
from google.adk.tools import FunctionTool
from .prompt import FindActivities_prompt
# Initialize Geoapify Tool

activities_tool = FunctionTool(func=get_activities)

# Activities Agent
activities_agent = LlmAgent(
    name="ActivitiesAgent",
    model="gemini-2.5-flash",
    description="Suggests activities and places to visit using Geoapify API.",
    tools=[activities_tool],
    output_key="activities.json",
    instruction=FindActivities_prompt,
    
)
root_agent = activities_agent