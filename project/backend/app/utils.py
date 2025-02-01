import asyncio
import requests
import os
from dotenv import load_dotenv
from scrapegraph_py import AsyncClient

load_dotenv()
SGAI_API_KEY = os.getenv("SGAI_API_KEY")

async def scrape_menu_data(locationNum: str, dtdate: str, activeMeal: str):
    """
    Scrapes the Rutgers dining hall menu using scrapegraph-py.
    
    Parameters:
    - locationNum (str): Dining hall number (e.g., "04" for Busch).
    - dtdate (str): Date in MM/DD/YYYY format.
    - activeMeal (str): Meal type (e.g., "Breakfast", "Lunch", "Dinner", "Knight+Room").
    
    Returns:
    - JSON response with menu data or an error message.
    """
    url = f"https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum={locationNum}&dtdate={dtdate}&activeMeal={activeMeal}"
    #print(url)
    response = requests.get(url)
    if response.status_code == 200:
        html_content = response.text  # Get the HTML content
        #print(html_content)  # Print or process the content
    else:
        print(f"Failed to fetch page. Status code: {response.status_code}")

    prompt = "give me a list of all the menu items and include the name and the portion size and the nutritional info link for each menu item"

    try:
        async with AsyncClient(api_key=SGAI_API_KEY) as client:
            #response = await client.smartscraper(website_url=url, user_prompt=prompt)
            response = await client.localscraper(website_html=html_content, user_prompt=prompt)
            return response['result']  # JSON formatted response
    except Exception as e:
        return {"error": str(e)}

# Test function (for debugging)
if __name__ == "__main__":
    test_result = asyncio.run(scrape_menu_data(locationNum="04", dtdate="02/01/2025", activeMeal="Lunch"))
    print(test_result)