import requests

API_KEY = "b5b8a8b65eb5497cb5e86178e8d90c15"  # Geoapify API key

def get_place_id(place_name, limit=1):
    """
    Get Geoapify place_id for a location name using Geocoding API.

    Args:
        place_name (str): Name of the place (e.g., "Connaught Place, Delhi, India")
        limit (int): Max results to return

    Returns:
        str: The first place_id found, or None if not found
    """
    url = "https://api.geoapify.com/v1/geocode/search"

    params = {
        "text": place_name,
        "format": "json",
        "limit": limit,
        "apiKey": API_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        print("DEBUG: Full geocode response:", data)

        results = data.get("results", [])
        if results:
            place_id = results[0]["place_id"]
            print("DEBUG: Found place_id:", place_id)
            return place_id
        else:
            print("DEBUG: No results returned for this place name.")
            return None

    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None



def search_places_in_place(place_id, category="catering.restaurant", limit=10):
    """
    Search places inside a Geoapify place_id.

    Args:
        place_id (str): Geoapify place_id
        category (str): Place category (restaurants, cafes, shops)
        limit (int): Max results

    Returns:
        dict: JSON response from Geoapify
    """
    url = "https://api.geoapify.com/v2/places"

    params = {
        "categories": category,
        "filter": f"place:{place_id}",
        "limit": limit,
        "apiKey": API_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        print("DEBUG: Full places response:", data)  # debug output
        return data
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return {"error": str(e)}


if __name__ == "__main__":
    # Try with more specific location including country for better accuracy
    place_name = "Hazratganj,lucknow, India"

    place_id = get_place_id(place_name)
    if place_id:
        results = search_places_in_place(place_id, category="accommodation.hotel", limit=5)
        features = results.get("features", [])
        if features:
            print(f"Found {len(features)} restaurants:")
            for place in features:
                props = place["properties"]
                print(f"{props.get('name','Unnamed')} - {props.get('address_line1','')} {props.get('address_line2','')}")
        else:
            print("No restaurants found in this place.")
    else:
        print("Place not found.")
