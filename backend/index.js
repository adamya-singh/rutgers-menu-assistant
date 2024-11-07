// first, we need to set up a simple express server to handle http requests
const express = require('express'); //import the express library
const app = express();  //create an instance of express server named app
const port = 3000;  //server will listen on port 3000

//for connecting to MongoDB
const mongoose = require('mongoose');
const Menu = require('./Menu');

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
    try{
        await scrapeMenu();
        res.send("Scraped successfully");
    } catch (error) {
        res.status(500).send('Scraping Error');
    }
});

async function scrapeMenu() {
    //connect to MongoDB
    mongoose.connect('mongodb://127.0.0.1:27017/menuDatabase')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error: " + err));

    //set chromedriver options
    const options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    //initialize a new selenium webdriver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        //navigate to website to scrape
        await driver.get('https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1');

        //get title of the website
        let title = await driver.getTitle();
        console.log("Title: " + title);

    }   catch (error) {
        console.error(error);
        
    }   finally {
        //quit the webdriver
        await driver.quit();
    }
}

//start server listening on port and log message to console
app.listen(port, () => {console.log("server running on http://localhost:" + port)});
