from google.adk.agents import Agent 

from backend.tools import google_search
from google.adk.tools import FunctionTool
from backend.prompt import Hotel_prompt
hotels_tool = FunctionTool(func=google_search)

root_agent = Agent(
    name="root_agent",
    model="gemini-2.5-flash-lite",
    instruction=Hotel_prompt,
    description="This is the root agent that calls the google search tool for all the queries and fetches the results.",
    # sub_agents=[billing_agent,bl_feedbaack_agent, bs_conflict_agent,bl_enquiry_agent,catalog_correction_agent,hot_leads_agent,nach_bounce_agent,pns_related_agent,seller_deactivation_agent,seller_panel_agent,service_related_agent,services_verfied_exporter_agent,social_media_agent,employee_issue_agent,catalog_view_agent,pns_defaulter_agent],
    tools=[google_search]  
)