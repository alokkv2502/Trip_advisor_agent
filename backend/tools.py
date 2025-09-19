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
    
    
    
def google_search2(location: str, check_in_date: str, check_out_date: str):
    """
    Search for hotels in a given location and date range, returning only the first property.
    
    Args:
        location (str): City or area to search hotels in.
        check_in_date (str): Check-in date in YYYY-MM-DD format.
        check_out_date (str): Check-out date in YYYY-MM-DD format.
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

        first_item = data.get("properties", [None])[0]  # get the first property
        if not first_item:
            return {"results": []}  # no properties found

        hotel = {
            "name": first_item.get("name"),
            "description": first_item.get("description"),
            "hotel_class": first_item.get("hotel_class"),
            "fare": first_item.get("rate_per_night", {}).get("lowest"),
            "reviews": first_item.get("reviews"),
            "overall_rating": first_item.get("overall_rating"),
            "location_rating": first_item.get("location_rating"),
            "nearby_places": first_item.get("nearby_places"),
            "amenities": first_item.get("amenities"),
        }

        return {"results": [hotel]}  # return a list with only the first hotel

    except Exception as e:
        print("Error during SerpAPI call:", e)
        return {"results": []} 



    
