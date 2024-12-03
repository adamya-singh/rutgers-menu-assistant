currently learning from techwithtim tutorial on web scraping with llms and implementing simple web scraping with a streamlit ui

next steps:
    - customize for my use case (rutgers-menu-assistant)
        - in scrape.py, manually find the menuBox element
        - then go through and make a list of all the <fieldset> elements inside menuBox
    - wrap functionality using fastapi
    - transition from streamlit ui to react.js ui

notes:
    - I still need to structure collection of each menu item myself, since the link to each respective nutritional info page for a menu item needs to be saved with the menu item it is part of