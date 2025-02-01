steps to open repository in vscode (macos) for development:

git clone https://github.com/adamya-singh/rutgers-menu-assistant
cd rutgers-menu-assistant
cd frontend
npm install
npx expo install (might have to do npm remove expo if you tried npm install expo before)
npx expo start



working link: https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum={locationNum}&dtdate={dtdate}&activeMeal={activeMeal}

locationNum:
    "04" - Busch
    "03" - Livingston
    "05" - Neilson
    "13" - Atrium

dtdate:
    "02/01/2025"

activeMeal:
    "Breakfast"
    "Lunch"
    "Dinner"
    "Knight+Room"

locationName: (not needed)
    "Busch+Dining+Hall" - Busch
    "Livingston+Dining+Commons" - Livingston
    "Neilson+Dining+Hall" - Neilson
    "The+Atrium" - Atrium

