from fastapi import APIRouter, Body, Depends, HTTPException
from app.schemas import DiningHallMenu

# Import the method to scrap the menu
# from app.utils.scraping import fetch_dining_menu

router = APIRouter(
    prefix="/menu",
    tags=["Menu Data"],
    responses={
        404: {"description": "Dining hall not found"},
        503: {"description": "Menu scraping service unavailable"},
    },
)


@router.get("/{dining_hall}", response_model=DiningHallMenu)
async def get_menu(dining_hall: str):
    try:
        # menu_data = await fetch_dining_menu(dining_hall)
        # return {"dining_hall": dining_hall, "menu": menu_data}
        pass
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
