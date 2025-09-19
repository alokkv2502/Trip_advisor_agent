import requests  # for making HTTP requests to Geoapify and SerpAPI
from typing import Optional
import os

GEOAPIFY_API_KEY = "b5b8a8b65eb5497cb5e86178e8d90c15"
SERP_API_KEY = "c21f3689b93c5f7125e847008e584a3dd7a197600fe1cfda46e9b89c39237b1a"



def geocode_place(place_name: str) -> tuple[float, float]:
    url = "https://api.geoapify.com/v1/geocode/search"
    params = {"text": place_name, "apiKey": GEOAPIFY_API_KEY}
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    features = data.get("features", [])
    if not features:
        return None, None
    coords = features[0]["geometry"]["coordinates"]
    return coords[1], coords[0]  # lat, lon


def find_restaurants(lat: Optional[str]=None, lon: Optional[str]=None, place_name: Optional[str]=None, limit: int = 5) -> dict:
    """
    Find nearby restaurants using Geoapify (optionally enriched via SerpAPI).
    - If lat/lon provided → search within 3km radius.
    - Otherwise, fall back to place_name search.
    Returns structured list of restaurants with lat, lon, and place_id.
    """
    print("\n\n----------------------")
    print(lat,lon,place_name,limit)
    print("----------------------\n\n")

    places_url = "https://api.geoapify.com/v2/places"

    params = {
        "categories": "catering.restaurant",
        "limit": limit,
        "apiKey": GEOAPIFY_API_KEY,
    }

    if lat and lon:
        params["filter"] = f"circle:{lon},{lat},10000"
    elif place_name:
        lat, lon = geocode_place(place_name)
        if not lat or not lon:
            return {"results": []}
        params["filter"] = f"circle:{lon},{lat},10000"
    else:
        return {"error": "Either lat/lon or place_name must be provided."}

    try:
        # Step 1: Fetch nearby restaurants from Geoapify
        resp = requests.get(places_url, params=params)
        resp.raise_for_status()
        geo_results = resp.json()
        features = geo_results.get("features", [])
        if not features:
            return {"results": []}

        restaurants = []
        for feature in features:
            props = feature.get("properties", {})
            geometry = feature.get("geometry", {})
            coords = geometry.get("coordinates", [None, None])

            restaurant = {
                "name": props.get("name", "Unnamed Restaurant"),
                "address": props.get("formatted"),
                "lat": coords[1],
                "lon": coords[0],
                "place_id": props.get("place_id"),
                "categories": props.get("categories"),
            }
            restaurants.append(restaurant)

        return {"results": restaurants}

    except Exception as e:
        print("Geoapify error:", e)
        return {"results": []}
