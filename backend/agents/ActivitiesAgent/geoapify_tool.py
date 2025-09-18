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



def get_activities(location: str, radius: int = 5000) -> dict:
    """
    Fetch activities & attractions for a location using Geoapify.
    Categories included: tourism, entertainment, sport.
    """
    places_url = "https://api.geoapify.com/v2/places"

    coords = geocode_location(location)
    params = {
        "categories": "tourism,entertainment,sport",
        "filter": f"circle:{coords['lon']},{coords['lat']},{radius}",
        "limit": 20,
        "apiKey": GEOAPIFY_API_KEY,
    }
    resp = requests.get(places_url, params=params)
    resp.raise_for_status()
    data = resp.json()

    # Normalize JSON: extract useful details
    activities = []
    for feature in data.get("features", []):
        props = feature["properties"]
        activities.append({
            "name": props.get("name"),
            "category": props.get("categories"),
            "address": props.get("formatted"),
            "lat": feature["geometry"]["coordinates"][1],
            "lon": feature["geometry"]["coordinates"][0],
            "rating": props.get("rank"),
            "details": {
                "place_id": props.get("place_id"),
                "datasource": props.get("datasource", {}).get("raw", {}),
            }
        })

    return {
        "location": location,
        "coordinates": coords,
        "activities": activities
    }
