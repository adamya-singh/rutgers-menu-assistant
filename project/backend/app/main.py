import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routing
from app.routes.menu import router as menu_router
from app.routes.meal_plan import router as meal_plan_router

app = FastAPI()

# Adds the routers to the app
app.include_router(menu_router)
app.include_router(meal_plan_router)

# Need to initialize the scraper to run

# Need to add the url of frontend server
origins = []

# Need to add communication with react native to render specfic content
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=8000,
    reload=True,
    reload_dirs=["app"],
    log_level="debug",
)
