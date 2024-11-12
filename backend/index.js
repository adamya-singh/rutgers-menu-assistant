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

    //initialize a new selenium webdriver (chromedriver)
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();


    //navigate to busch menu portal in chromedriver
    await driver.get('https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1');
    
    //get webpage title
    let title;
    try {
        title = await driver.getTitle();
        console.log("got title -- " + title);

    }   catch(error){
            console.log("error getting title -- " + error);
            await driver.quit();
            //process.exit(); ?
    }
    
    let containerMainContentDiv;
    try {
        containerMainContentDiv = await driver.findElement(By.css('.container.main-content'));
        console.log("got <div class='container main-content'>");

    }   catch(error){
            console.log("error getting <div class='container main-content'> -- " + error);
            await driver.quit();
    }

    let rowDiv;
    try {
        rowDiv = await containerMainContentDiv.findElement(By.className('row'));
        console.log("got <div class='row'>");

    }   catch(error){
            console.log("error getting <div class='row'> -- " + error);
            await driver.quit();
    }

    let pullRightDiv;
    try {
        pullRightDiv = await rowDiv.findElement(By.css('.col-md-9.pull-right'));
        console.log("got <div class='col-md-9 pull-right'>");

    }   catch(error){
            console.log("error getting <div class='col-md-9 pull-right'> -- " + error);
            await driver.quit();
    }

    let contentTextDiv;
    try {
        contentTextDiv = await pullRightDiv.findElement(By.id('content-text'));
        console.log("got <div id='content-text>");

    }   catch(error){
            console.log("error getting <div id='content-text> -- " + error);
            await driver.quit();
    }

    //get dining hall name from page
    let diningHallNameh1;
    let diningHallName;
    try {
        diningHallNameh1 = await contentTextDiv.findElement(By.css('h1'));
        diningHallName = await diningHallNameh1.getText();
        console.log("got <h1> -- dining hall name: " + diningHallName);

    }   catch(error){
            console.log("error getting <h1> dining hall name -- " + error);
            await driver.quit();
    }
    
    

    /*
    let containerMainContent = await driver.findElement(By.css('.container.main-content'))
        .then((containerMainContent) => {
            console.log("got <div class ='container main-content'>");
        })
        .catch((error) =>   {
        console.error("error getting <div class ='container main-content'> -- " + error);
        })

    let row = await containerMainContent.findElement(By.className('row'))
        .then((row) => {
            console.log("got <div class ='row'>");
        })
        .catch((error) =>   {
        console.error("error getting <div class ='row'> -- " + error);
        })
    */
    
    //get title of the website and log to console
    /*try {
        //navigate to website to scrape
        await driver.get('https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1');

        //get title of the website
        let title = await driver.getTitle();
        console.log("Title: " + title);

        let containerMainContent = driver.findElement(By.css('.container.main-content'))
        .then((containerMainContent) => {
            console.log("got <div class ='container main-content'>");
        })
        .catch((error) =>   {
        console.error("error getting <div class ='container main-content'> -- " + error);
        })

    }   catch (error) {
        console.error("error getting title -- " + error);
    }   finally{
        await driver.quit();
    }*/

    //TODO: SCRAPE A MENU ITEM + NUTRITIONAL INFO
    

    

    //}   //finally {
        //quit the webdriver
        //await driver.quit();
    //}

    finally{
        await driver.quit();
        console.log("quit webdriver");
        //process.exit();
    }
    //await driver.quit();
}

//start server listening on port and log message to console
app.listen(port, () => {console.log("server running on http://localhost:" + port)});
