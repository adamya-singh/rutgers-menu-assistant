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