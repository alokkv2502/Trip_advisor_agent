import requests

# Geoapify API key
GEOAPIFY_API_KEY = "b5b8a8b65eb5497cb5e86178e8d90c15"
# SerpAPI key
SERP_API_KEY = "c21f3689b93c5f7125e847008e584a3dd7a197600fe1cfda46e9b89c39237b1a"

# --- Step 1: Get Place ID ---
def get_place_id(place_name: str):
    url = "https://api.geoapify.com/v1/geocode/search"
    params = {
        "text": place_name,
        "format": "json",
        "apiKey": GEOAPIFY_API_KEY,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        results = data.get("results", [])
        if results:
            print(results[0]["place_id"])
            return results[0]["place_id"]
        return None
    except Exception as e:
        print("Geoapify error:", e)
        return None


# --- Step 2: Search Places inside Place ID ---
def search_places_in_place(place_id: str, category="accommodation.hotel"):
    url = "https://api.geoapify.com/v2/places"
    params = {
        "categories": category,
        "filter": f"place:{place_id}",
        "apiKey": GEOAPIFY_API_KEY,

    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print("Geoapify places error:", e)
        return {"features": []}


# --- Step 3: Call SerpAPI (Google Hotels) ---
def google_search2(location: str, check_in_date: str, check_out_date: str):
    url = "https://serpapi.com/search.json"
    params = {
        "api_key": SERP_API_KEY,
        "engine": "google_hotels",
        "q": location,
        "currency": "INR",
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        properties = data.get("properties") or data.get("local_results", [])
        if not properties:
            return {"results": []}

        first_item = properties[0]

        hotel = {
            "name": first_item.get("name"),
            "description": first_item.get("description"),
            # "hotel_class": first_item.get("hotel_class"),
            "fare": (first_item.get("rate_per_night") or {}).get("lowest"),
            
            "reviews": first_item.get("reviews"),
            "overall_rating": first_item.get("overall_rating"),
            # "location_rating": first_item.get("location_rating"),
            # "nearby_places": first_item.get("nearby_places"),
            # "amenities": first_item.get("amenities"),
        }

        return {"results": [hotel]}

    except Exception as e:
        print("SerpAPI error:", e)
        return {"results": []}


# --- Final Integrated Flow ---
def find_hotels(lat:str, lon:str, check_in_date: str, check_out_date: str) -> dict:
    """
    Find nearby hotels using Geoapify + SerpAPI.
    1. Search for hotels near given lat/lon via Geoapify.
    2. For each hotel, enrich details via SerpAPI.
    Returns structured list of hotels with lat, lon, and place_id.
    """

    places_url = "https://api.geoapify.com/v2/places"
    params = {
        "categories": "accommodation.hotel",
        "filter": f"circle:{lon},{lat},10000",
        "limit": 1,
        "apiKey": GEOAPIFY_API_KEY,
    }

    # Step 1: Fetch nearby hotels from Geoapify
    resp = requests.get(places_url, params=params)
    resp.raise_for_status()
    geo_results = resp.json()
    features = geo_results.get("features", [])
    if not features:
        return {"results": []}

    hotels = []
    # Step 2: Enrich with SerpAPI
    for feature in features:
        props = feature.get("properties", {})
        geometry = feature.get("geometry", {})
        coords = geometry.get("coordinates", [None, None])

        hotel_name = props.get("name", "Unnamed Hotel")
        address = props.get("formatted", f"{props.get('address_line1', '')} {props.get('address_line2', '')}")
        place_id = props.get("place_id")

        serp_result = google_search2(f"{hotel_name}, {address}", check_in_date, check_out_date)

        enriched_hotels = serp_result.get("results", [])
        for h in enriched_hotels:
            hotels.append({
                "name": h.get("name", hotel_name),
                "description": h.get("description", ""),
                "fare": h.get("fare", ""),
                "reviews": h.get("reviews", 0),
                "overall_rating": h.get("overall_rating", 0),
                "address": address,
                "lat": coords[1],
                "lon": coords[0],
                "place_id": place_id,
            })

    return {"results": hotels}



# --- Example Run ---
if __name__ == "__main__":
    results = find_hotels("18.921778", "72.8332848316978", "2025-10-01", "2025-10-03")
    for hotel in results.get("results", []):
        print(hotel)

