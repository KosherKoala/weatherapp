Tools Used  
* React - UI
* Mobx - DataLayer and state management
* Bootstrap - UI/CSS
* ChartKick - Chart.js Wrapper for react
* Moment - Date calculator
* Chartjs - Chart Visuals


Getting Started
1. Clone Repo
2. Install node modules    
    run `yarn install` in /weatherapp
3. Start Dev Server  
    `yarn start` in /weatherapp

Testing

1. I have limited experience with automated testing using tools like jest and enzyme, however I currently working on and excited to add it to my skillset. Testing is a very important part of my development process, so I performed extenive manual tests. With each completed component I would test the functionality of all previously created components to ensure that they continued to work properly.  
  
Below are the manual tests I performed:
  

2. API Updates  
    a. occurs only when city is changed 
    1. City Picker  
    
        - Select each city and confirm data is correctly displayed in graph  
        - Select each city and confirm that all raw data is accountable/corrent for option updates  
        - Select each city and confirm that the button text is updated with new city name
        - If error on data fetch (Out of bounds, network error), show error message and avoid rendering
        
3. Option Updates   
    a. Option updates do not require server calls, they simply parse and reorganize the raw data from the initial API call   
     1. F/C Picker  
        
           - Select C confirm that graph refreshes with Celsius data and Farenheit radio deselects  
           - Select F confirm that graph refreshes with Farenheit data and Celsius radio deselects  
           - Ensure the graph bounds scales correctly with new data 
           
      2. TimeSpan Picker  
      
           - Confirm that the UI dropdown renders correctly  
           - Select daily confirm that graph refreshes with daily data and the dropdown displays "daily"  
           - Select weekly confirm that graph refreshes with monthly data and the dropdown displays "weekly"  
           - Select monthly confirm that graph refreshes with monthly data and the dropdown displays "monthly"  
           - Ensure the graph bounds scales correctly (high and lows, week marks)
           - Ensure that the Title component updates with corresponding word
           
      3. High and Low  
        
           - Uncheck all both high and low, no data should be displayed  
           - Check high, confirm that graph refreshes with only the high data, the high box is checked, the graph bounds scale to high data, and the low box remains unchecked  
           - Uncheck high, no data should be displayed, the high box is unchecked   
           - Check low, confirm that graph refreshes with only the low data, the low box is checked, the graph bounds scale to low data, and the high box remains unchecked  
           - Uncheck low, no data should be displayed, the low box is unchecked  
           - Check high and low, confirm that graph refreshes with both low and high data, both boxes are checked, the graph high bound scales to high data and the low bound scales to the low data  
           - Ensure that the Title component updates with corresponding letter and/or slash
   



