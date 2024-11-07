// first, we need to set up a simple express server to handle http requests
const express = require('express'); //import the express library
const app = express();  //create an instance of express server named app
const port = 3000;  //server will listen on port 3000

//import the following classes from selenium-webdriver
const {Builder, By, until} = require('selenium-webdriver');
    //Builder - used to initialize a new webdriver instance
    //By - used to locate elements on a webpage
    //until - used to tell selenium to wait for a trigger or time
const chrome = require('selenium-webdriver/chrome');

//defines what happens when a client requests this specific route (send a response of Hello World)
app.get('/', (req, res) => {res.send('Hello World');});


//define the route where clients can request the data
app.get('/scrape', async (req, res) => {
    //set chromedriver options
    const options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    //initialize a new selenium webdriver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        //navigate to website to scrape
        await driver.get('https://scrapethissite.com');

        //get title of the website
        let title = await driver.getTitle();

        //send the title back as the response
        res.send("Title: " + title);
    }   catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during scraping');
    }   finally {
        //quit the webdriver
        await driver.quit();
    }
});

//start server listening on port and log message to console
app.listen(port, () => {console.log("server running on http://localhost:" + port)});
