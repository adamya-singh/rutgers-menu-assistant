# Contains all the models required for the requests. Classes will import the relevant requests as needed

from pydantic import BaseModel
from typing import List, Optional


class MenuItem(BaseModel):
    """Detailed structure for individual menu items"""

    name: str
    ingredients: List[str] = []
    allergens: List[str] = []
    is_vegetarian: bool = False
    is_vegan: bool = False
    nutrition: Optional[dict]


class DiningHallMenu(BaseModel):
    """Full menu structure for a dining hall"""

    hall_name: str
    breakfast: List[MenuItem]
    lunch: List[MenuItem]
    dinner: List[MenuItem]


class MealPlanRequest(BaseModel):
    """User preferences for meal generation"""

    dietary_restrictions: List[str]

    allergies: List[str]
    # Plan on adding a numeric priority to deteremine how important specific preferences are
    preferences: List[str]
    goal: Optional[str]


class GeneratedMeal(BaseModel):
    """Structure for a single meal recommendation"""

    dishes: List[MenuItem]
    combined_nutrition: dict


class MealPlanResponse(BaseModel):
    """Full meal plan structure"""

    breakfast: GeneratedMeal
    lunch: GeneratedMeal
    dinner: GeneratedMeal
    llm_reasoning: Optional[str]


class ErrorResponse(BaseModel):
    """Standard error format"""

    detail: str
    error_code: Optional[int]
