setup:
    - clone repository

    - run 'npm install' in the backend directory to install dependencies from package.json

run:
    - run 'start-MongoDB.sh' to start MongoDB database
    - cd to backend directory and run 'node index.sh'

todo:
    -scrape data and store in mongodb database
        -scrape item names
        -scrape nutritional info
            -scrape data from nutrition info labels
            -identify 'no data' labels for some items
    -vectorize data and put it through a document loader