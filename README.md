This version of rutgers-menu-assistant was abandoned because I chose to change the structure of the project, now opting for a python fastapi backend instead of node.js backend. This version only locates and scrapes the menuBox before stopping.


setup:
    - clone repository

    - run 'npm install' in the backend directory to install dependencies from package.json

run:
    - cd to 'backend' directory
    - run 'start-MongoDB.sh' to start MongoDB database
    - run 'node index.js'

todo:
    -scrape data and store in mongodb database
        -scrape item names
        -scrape nutritional info
            -scrape data from nutrition info labels
            -identify 'no data' labels for some items
    -vectorize data and put it through a document loader