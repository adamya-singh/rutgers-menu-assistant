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
    
    let dateP;
    try {
        dateP = await contentTextDiv.findElement(By.css('p'));
        console.log("got <p> date p");

    }   catch(error){
            console.log("error getting <p> date p -- " + error);
            await driver.quit();
    }

    let dateSelect;
    try {
        dateSelect = await dateP.findElement(By.css('select'));
        console.log("got <select> date select");

    }   catch(error){
            console.log("error getting <select> date select -- " + error);
            await driver.quit();
    }

    let allDateSelectOptions;
    try {
        //sets allDateSelectOptions to an array of WebElements
        //allDateSelectOptions contains all dates in the menu date dropdown
        allDateSelectOptions = await dateSelect.findElements(By.css('option'));
        console.log("got all displayed date select options: ");
        for(let option of allDateSelectOptions){
            let optionText = await option.getText();
            console.log(optionText);
        }

    }   catch(error){
            console.log("error getting all date select options -- " + error);
    }

    let selectedDateElement;
    let selectedDate;
    try {
        selectedDateElement = await dateSelect.findElement(By.css('option:checked'));
        selectedDate = await selectedDateElement.getText();
        console.log("got selected date -- " + selectedDate);

    }   catch(error){
            console.log("error getting selected date -- " + error);
            await driver.quit();
    }

    let mealTabsDiv;
    try {
        mealTabsDiv = await contentTextDiv.findElement(By.className('tabs'));
        console.log("got <div class='tabs>");

    }   catch(error){
            console.log("error getting <div class='tabs'> -- " + error);
            await driver.quit();
    }

    //this will be used later to collect all menus
    //allMealTabOptions contains elements with links to menus for different meals
        //meals include {Breakfast, Lunch, Dinner, Knight Room (Busch)}
    //activeMealTabOption is the name of the currently active meal tab (which meal is displayed, breakfast, lunch, etc.)
    let allMealTabOptions;
    let activeMealTabOption;
    try {
        allMealTabOptions = await mealTabsDiv.findElements(By.css('.tab'));
        console.log("got all meal tab options:");
        for (let tab of allMealTabOptions){
            //for each tab in the meal tab options
            let tabText = await tab.getText();
            console.log("mealtab: " + tabText);

            let isActive = await tab.getAttribute("class");
            if(isActive.includes("active")) {
                activeMealTabOption = await tab.getText();
            }
        }
        console.log("got active meal tab option -- " + activeMealTabOption);

    }   catch(error){
            //error with getting all options or active option
            console.log("error getting meal tab options -- " + error);
            await driver.quit();
    }

    let recipeForm;
    try {
        recipeForm = await contentTextDiv.findElement(By.css('form[name="recipe"]'));
        console.log("got <form name='recipe'>");

    }   catch(error){
            console.log("error getting <form name='recipe'> -- " + error);
            await driver.quit();
    }
    
    let menuBoxDiv;
    try {
        menuBoxDiv = await recipeForm.findElement(By.className('menuBox'));
        console.log("got <div class='menuBox'>");

    }   catch(error){
            console.log("error getting <div class='menuBox'> -- " + error);
            await driver.quit();
    }

    let firstMenuCategory;
    let firstMenuCategoryText;
    try {
        firstMenuCategory = await menuBoxDiv.findElement(By.css('h3'));
        firstMenuCategoryText = await firstMenuCategory.getText();
        console.log("got <h3> -- first menu category: " + firstMenuCategoryText);

    }   catch(error){
            console.log("error getting <div class='menuBox'> -- " + error);
            await driver.quit();
    }
    
    //TODO: SCRAPE ALL MENU CATEGORIES IN A MENUBOX
    //TODO: SCRAPE ALL MENU ITEMS IN A MENU CATEGORY
    //TODO: SCRAPE A MENU ITEM'S NUTRITIONAL INFO

    finally{
        await driver.quit();
        console.log("quit webdriver");
        //process.exit();
    }
}

//start server listening on port and log message to console
app.listen(port, () => {console.log("server running on http://localhost:" + port)});
