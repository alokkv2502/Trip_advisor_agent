# tools/geoapify_tool.py
import os
import requests


GEOAPIFY_API_KEY = "b5b8a8b65eb5497cb5e86178e8d90c15"  # load from .env


def geocode_location(location: str) -> dict:
    """Convert a location name (city/state/country) into latitude & longitude coordinates."""
    geocode_url = "https://api.geoapify.com/v1/geocode/search"
    params = {"text": location, "apiKey": GEOAPIFY_API_KEY}
    resp = requests.get(geocode_url, params=params)
    resp.raise_for_status()
    data = resp.json()
    if not data.get("features"):
        raise ValueError(f"Location not found: {location}")
    coords = data["features"][0]["geometry"]["coordinates"]
    return {"lon": coords[0], "lat": coords[1]}



def get_activities(location: str, check_in_date: str, check_out_date: str) -> dict:
    """
    Fetch activities & attractions for a location using Geoapify.
    Returns simplified JSON: ThingsToDo list.
    
    Parameters:
    - location: City/state/country
    - check_in_date, check_out_date: Dates for future hotel search
    """
    places_url = "https://api.geoapify.com/v2/places"

    geo = geocode_location(location)
    params = {
        "categories": "tourism,entertainment,sport",
        "filter": f"circle:{geo['lon']},{geo['lat']},5000",
        "limit": 4,
        "apiKey": GEOAPIFY_API_KEY,
    }
    resp = requests.get(places_url, params=params)
    resp.raise_for_status()
    data = resp.json()
    
    activities = []
    for feature in data.get("features", []):
        props = feature["properties"]
        activities.append({
            "name": props.get("name"),
            "categories": props.get("categories", []),
            "address": props.get("formatted"),
            "lat": props.get("lat"),
            "lon": props.get("lon"),
            "place_id": props.get("place_id"),
            "rating": props.get("rank"),
            "check_in_date": check_in_date,   # pass dates downstream
            "check_out_date": check_out_date
        })

    return {
        "ThingsToDo": activities
    }





if __name__ == "__main__":
    # Simple test
    location = "lucknow"
    activities = get_activities(location)
    print(activities)

