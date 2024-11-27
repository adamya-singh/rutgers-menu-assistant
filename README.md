add description here


setup:
    - clone repository

run:
    - cd to 'backend' directory


todo:
    -scrape data and store in mongodb database
        -scrape item names
        -scrape nutritional info
            -scrape data from nutrition info labels
            -identify 'no data' labels for some items
    -vectorize data and put it through a document loader