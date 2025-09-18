import requests

import requests
from typing import Dict, Any

API_KEY = "c21f3689b93c5f7125e847008e584a3dd7a197600fe1cfda46e9b89c39237b1a"

def google_search(location: str, check_in_date: str, check_out_date: str):
    """
    Search for hotels in a given location and date range.
    
    Args:
        location (str): City or area to search hotels in.
        check_in_date (str): Check-in date in YYYY-MM-DD format.
        check_out_date (str): Check-out date in YYYY-MM-DD format.
        guests (int): Number of guests (default = 1).
    """
    url = "https://serpapi.com/search.json"
    params = {
        "api_key": API_KEY,
        "engine": "google_hotels",
        "q": location,
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
        
    }
    print("Calling SerpAPI with params:", params)
    try:
     response = requests.get(url, params=params)
     data = response.json()
     hotels = []
     for item in data.get("properties", []):
        hotels.append({
            "name": item.get("name"),
            "description": item.get("description"),
            "hotel_class": item.get("hotel_class"),
            "fare": item.get("rate_per_night", {}).get("lowest"),
            "reviews": item.get("reviews"),
            "overall_rating": item.get("overall_rating"),
            "location_rating": item.get("location_rating"),
            "nearby_places": item.get("nearby_places"),
            "amenities": item.get("amenities"),
        })
     return {"results": hotels}
    except Exception as e:
        print("Error during SerpAPI call:", e)
        return {"results": []}
    
    
    
    



    
