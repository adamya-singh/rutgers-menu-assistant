const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    //first, write the code to scrape each menu item and nutritional info
    //then save each (menu item and nutritional info) + date to DB
    //
    itemName: String,
    nutritionalInfo: {
        servingSize: String,
        calories: Number,
        //amount per serving, % daily value
        totalFat: Number,
        totalFatPercentDV: Number,
        totalCarb: Number,
        totalCarbPercentDV: Number,
        saturatedFat: Number,
        saturatedFatPercentDV: Number,
        dietaryFiber: Number,
        dietaryFiberPercentDV: Number,
        transFat: Number,
        sugars: Number,
        cholesterol: Number,
        protein: Number,
        sodium: Number,
        sodiumPercentDV: Number,
        proteinPercentDV: Number,
        fatPercentDV: Number,
        carbohydratesPercentDV: Number,
        calciumPercentDV: Number,
        cholesterolPercentDV: Number,
        transfattyacidPercentDV: Number,
        caloriesPercentDV: Number,
        totalSugarsPercentDV: Number,
        ironPercentDV: Number,
    },
    date: {type: Date, default: Date.now}
});