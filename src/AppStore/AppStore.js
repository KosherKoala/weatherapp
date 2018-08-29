// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// Mobx AppStore/Data layer, contains most of site data and methods, and all API calls

import {observable, action, toJS} from 'mobx';
import moment from 'moment';

export default class AppStore{

    constructor(){
        // Initialize Day Range
        this.getDayRange();

        // Bindings
        this.getChartData = this.getChartData.bind(this);
        this.setC = this.setC.bind(this);
        this.setF = this.setF.bind(this);
        this.toggleHigh = this.toggleHigh.bind(this);
        this.toggleLow = this.toggleLow.bind(this);
    }

    // Chart Data
    @observable
    chartData = null;

    @observable
    displayData = null;

    @observable
    chartOptions = {
        min: 40,
        max: 100
    }

    @action
    setDisplayData(){
        this.displayData = [{name: "High", data: {}}, {name: "Low", data: {}}];
        var min = 9999999, max = -9999999;
        var tempH = null, tempL = null;

        // Get Display depending on timespan
        if(this.timeSpan === "daily")
            this.displayDaily(min, max, tempH, tempL);
        else if(this.timeSpan === "weekly")
            this.displayWeekly(min, max, tempH, tempL);
        else if(this.timeSpan === "monthly")
            this.displayMonthly(min, max, tempH, tempL);
    }

    @action
    displayDaily(min, max, tempH, tempL){
        var count = 0;
        for (var data in toJS(this.chartData)) {
            if(count === 7){
                break;
            }
            if (this.chartData.hasOwnProperty(data)) {
                // Grab all F temperatures
                if(this.mode === "F"){
                    //Grab High
                    tempH = this.chartData[data].high.f;
                    if(this.high){
                        this.displayData[0].data[data] = tempH;
                        // Min max Checker for bounds
                        if(max < tempH){
                            max = tempH;
                        }
                        if(min > tempH){
                            min = tempH;
                        }
                    }
                    
                    // Grab Low
                    tempL = this.chartData[data].low.f;
                    if(this.low){
                        this.displayData[1].data[data] = tempL;
                        // Min max Checker for bounds
                        if(max < tempL){
                            max = tempL;
                        }
                        if(min > tempL){
                            min = tempL;
                        }
                    }

                }
                else{
                    // Grab all C temperatures
                    // Grab High
                    tempH = this.chartData[data].high.c;
                    if(this.high){
                        this.displayData[0].data[data] = tempH;
                        // Min max Checker for bounds
                        if(max < tempH){
                            max = tempH;
                        }
                        if(min > tempH){
                            min = tempH;
                        }
                    }
                    //Grab Low
                    tempL = this.chartData[data].low.c;
                    if(this.low){
                        this.displayData[1].data[data] = tempL;
                        // Min max Checker for bounds
                        if(max < tempL){
                            max = tempL;
                        }
                        if(min > tempL){
                            min = tempL;
                        }
                    }
                }
                
            }
            count++;
        }
        // Setbounds
        this.chartOptions.min = min - 5;
        this.chartOptions.max = max + 5;
    }

    @action
    displayWeekly(min, max, tempH, tempL){

        var weeklyTotalH = 0, weeklyTotalL = 0;
        var weekStart = null;
        var avgH = 0, avgL = 0;
        var count = 0;

        // Iterate through all raw day data
        for (var data in toJS(this.chartData)) {
            if (this.chartData.hasOwnProperty(data)) {
                // Add Data and wipe record at end of each week
                if(count === 7){
                    // Calc average High
                    if(weeklyTotalH !== 0){
                        avgH = Math.floor(weeklyTotalH/7);
                        this.displayData[0].data[weekStart] = avgH;
                        // Min and Max for graph bounds
                        if(min > avgH){
                            min = avgH;
                        }
                        if(max < avgH ){
                            max = avgH;
                        }
                    }
                    // Calc average Low
                    if(weeklyTotalL !== 0){
                        avgL = Math.floor(weeklyTotalL/7);
                        this.displayData[1].data[weekStart] = avgL;
                        
                        // Min and Max for graph bounds
                        if(min > avgL){
                            min = avgL;
                        }
                        if(max < avgL ){
                            max = avgL;
                        }
                    }
                    // Wipe
                    weeklyTotalH = 0;
                    weeklyTotalL = 0;
                    count = 0;
                }
                // Set the week start
                if(count === 0){
                    weekStart = data;
                }
                // Grab all F temperatures
                if(this.mode === "F"){
                    //Grab High
                    if(this.high)
                        weeklyTotalH += this.chartData[data].high.f;
                    
                    if(this.low)
                        weeklyTotalL += this.chartData[data].low.f;
                }
                else{
                    // Grab all C temperatures
                    if(this.high)
                        weeklyTotalH += this.chartData[data].high.c;
                    
                    if(this.low)
                        weeklyTotalL += this.chartData[data].low.c;
                }
                count++;
            }
        }
        // Set Graph bounds
        this.chartOptions.min = min - 5;
        this.chartOptions.max = max + 5;
    }

    @action
    displayMonthly(min, max, tempH, tempL){
        var monthlyTotalH = 0, monthlyTotalL = 0;
        var monthStart = null, monthEnd = null;
         
        var count = 0;
        // Iterate through all raw day data
        for (var data in toJS(this.chartData)) {
            if (this.chartData.hasOwnProperty(data)) {
                // End and start dates
                if(count === 0){
                    monthStart = data;
                }
                if(count === 29){
                    monthEnd = data;
                }

                // Grab all F temperatures
                if(this.mode === "F"){
                    //Grab High
                    if(this.high)
                       monthlyTotalH += this.chartData[data].high.f;
                    
                    if(this.low)
                       monthlyTotalL += this.chartData[data].low.f;
                }
                else{
                    // Grab all C temperatures
                    if(this.high)
                       monthlyTotalH += this.chartData[data].high.c;
                    
                    if(this.low)
                       monthlyTotalL += this.chartData[data].low.c;
                }
                count++;
            }
        }
        // Calcualte Monthly Average - If the total was 0 then dont add data to the graph
        var avgH, avgL;
        if(monthlyTotalH !== 0){
            avgH = Math.floor(monthlyTotalH/30);
            this.displayData[0].data[monthStart] = avgH;
            this.displayData[0].data[monthEnd] = avgH;
        }
        else{
            avgH = 0;
        }
        if(monthlyTotalL !== 0){
            avgL = Math.floor(monthlyTotalL/30);
            this.displayData[1].data[monthStart] = avgL;
            this.displayData[1].data[monthEnd] = avgL;
        }
        else{
            avgL = 0;
        }
        
        // Find min and max for graph bounds
        if( monthlyTotalH !== 0 && monthlyTotalL !== 0){
            this.chartOptions.min = avgL - 5;
            this.chartOptions.max = avgH + 5;
        }
        else{
            if(monthlyTotalL === 0 && monthlyTotalH !== 0){
                this.chartOptions.min = avgH - 5;
                this.chartOptions.max = avgH + 5;
            }
            else if(monthlyTotalH === 0 && monthlyTotalL !== 0){
                this.chartOptions.min = avgL - 5;
                this.chartOptions.max = avgL + 5;
            }
            else{
                this.chartOptions.min = 10;
                this.chartOptions.max = -10;
            }
        }
    }

    // Options 
    @observable
    mode = "F";
    
    @observable
    high = true;

    @observable
    low = true;

    @observable
    timeSpan = 'daily';
    times = ['daily', 'weekly', 'monthly'];

    @action
    pickTime(time){
        this.timeSpan = time;
        this.setDisplayData();
    }

    @action
    setF(){
        if(this.mode !== "F"){
           // console.log("Setting f");
            this.mode = "F";
            this.getChartData();
        }
    }

    @action 
    setC(){
        console.log("Setting C");
        if(this.mode !== "C"){
            this.mode = "C";
            this.getChartData();
        }
    }

  

    @action 
    toggleHigh(){
        this.high = !this.high;
        this.setDisplayData();
    }
    @action 
    toggleLow(){
        this.low = !this.low;
        this.setDisplayData();
    }

    // Location Data
    @observable
    currentLocation = "Rome, Italy";
    
    locations = ["San Francisco, CA",
    "Amsterdam, Netherlands",
    "Oakland, CA",
    "Rome, Italy",
    "Cleveland, OH",
    "Tel Aviv, Israel",
    "New York City, NY",
    "Murmansk, Russia",
    "Istanbul, Turkey"];

    @action
    setLocation(location){
        this.currentLocation = location;
        this.getChartData();
    }

    // Day Range
    @observable
    dayRange = [];


    @action
    getDayRange(){
        for(let i = 0; i < 30; i++){
            this.dayRange.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
        }
    }

    // Weather API
    @action
    getChartData(){
        this.chartData = {};
        // Loop through all Days in range
        for(let day of toJS(this.dayRange)){
            // Dynamicly Fetch data using APIXU
            fetch('http://api.apixu.com/v1/history.json?key=0cedbbf7880d4f52919145142182808&q='+this.currentLocation+'&dt='+day)
                .then(res =>{
                    return res.json()
                })
                .then(data => {
                    // Grab and reformat raw data
                    var dayData = data.forecast.forecastday[0].day;
                    this.chartData[day] = {high:{f: dayData.maxtemp_f, c: dayData.maxtemp_c}, low:{f: dayData.mintemp_f, c: dayData.mintemp_c},};
                    
                    // Determine data to be displayed (avoids many API calls)
                    this.setDisplayData();
                });
            }
    }

}