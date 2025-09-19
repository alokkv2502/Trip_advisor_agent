

from google.adk.agents import LlmAgent
from .prompt import CONCLUSION_AGENT_PROMPT


conclusion_agent = LlmAgent(
    name="conclusion_agent",
    model="gemini-2.0-flash",
    description=(
        """
The Conclusion Agent transforms raw or fuzzy trip data (from APIs or text) into
a well-structured JSON format. It organizes details of activities, places to visit,
hotels, restaurants, cafes, rentals, and shopping into a consistent schema.

After formatting, it estimates costs for accommodation, activities, food,
transportation, and other expenses. Using these estimations, it generates five
trip plans categorized by budget levels:

1. Luxury Escape
2. Premium Comfort
3. Balanced Traveler
4. Budget Explorer
5. Economy Saver

Each plan includes total estimated cost, detailed cost breakdown, and a
description of the travel experience. In short, this agent is both a data
formatter and final trip planner.
"""
    ),
    instruction=CONCLUSION_AGENT_PROMPT,
    tools=[],
    output_key="conclusion_json"

)

root_agent = conclusion_agent