import { loadData } from "./loadData.js";
import { loadGifs } from "./gifs.js";
import { loadHeader } from "./loadHeaderBG.js";


const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.input-box');

// default run gif

const start = async () => {
    await loadHeader();

}
start();


// Search Function
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    console.log('search btn clicked... fetching data');

    // this will run fetch data
    fetchData(searchInput.value);
})



// Fetch Data
const fetchData = async (searchInput) => {
    const jsonData = await loadData(searchInput);

    console.log("displaying data...");
    console.log(jsonData);

    renderData(jsonData);
};

// Render data 
const renderData = async(jsonData) => {
    // display country
    const location = jsonData.resolvedAddress;

    const searchCountry = document.querySelector('.search-country');
    console.log('resolved address is: ' + location);
    searchCountry.textContent = location;




}

const parseWeather = (data, day=0) => {
    const today = data.days[day];

    return {
        location: data.resolvedAddress,
        temp: today.temp,
        humidity: today.humidity,
        wind: today.windspeed,
        condition: today.conditions,
        precipitation: today.precip,
        icon: today.icon,
    };
};