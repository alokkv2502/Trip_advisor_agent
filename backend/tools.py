import requests

import requests
from typing import Dict, Any

API_KEY = "c21f3689b93c5f7125e847008e584a3dd7a197600fe1cfda46e9b89c39237b1a"

def google_search(query: str,check_in_date,check_out_date) -> Dict[str, Any]:
    """
    Search hotels using SerpAPI (Google Hotels engine).
    
    Args:
        query (str): location/hoels extracted from the query .
        check_in_date (str): Check-in date in 'YYYY-MM-DD' format.
        check_out_date (str): Check-out date in 'YYYY-MM-DD' format.
        
    
    Returns:
        dict: A list of hotels with name, location, fare, ratings, reviews, and other details.
    """
    url = "https://serpapi.com/search.json"
    params = {
        "api_key": API_KEY,
        "engine": "google_hotels",
        "q": query,
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
    
    
    
    


if __name__ == "__main__":
    API_KEY = "c21f3689b93c5f7125e847008e584a3dd7a197600fe1cfda46e9b89c39237b1a"   # 🔑 Replace with your SerpAPI key
    query = "hotel in udaipur"
    
    search_results = google_search(query,"2025-10-01","2025-10-05")
    
    print("Top Search Results:", search_results)
    
