from google.adk.agents import LlmAgent
from google.adk.tools import FunctionTool
from restaurant_prompt import restaurants_prompt
from restaurant_agent_tool import find_restaurants


restaurant_tool = FunctionTool(func=find_restaurants)



restaurant_agent = LlmAgent(
    name="find_restaurants_agent",
    model="gemini-2.5-flash",
    instruction=restaurants_prompt,
    description="Fetches restaurants near a given location using lat/lon and check-in/check-out dates.",
    tools=[restaurant_tool],
    output_key="restaurants_json"  
)

