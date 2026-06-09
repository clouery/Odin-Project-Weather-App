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
});



// Fetch Data
const fetchData = async (searchInput) => {
    const jsonData = await loadData(searchInput);

    console.log("displaying data...");
    console.log(jsonData);

    renderData(jsonData);
};

const container= document.querySelector('.weather-container');

// Render data 
const renderData = async (jsonData) => {

    container.textContent = "";

    const location = jsonData.resolvedAddress;

    const today = parseWeather(jsonData, 0);
    const nextDay = parseWeather(jsonData, 1);
    const dayAfter = parseWeather(jsonData, 2);

    // CREATE COUNTRY BLOCK
    const countryBlock = document.createElement('div');
    countryBlock.classList.add('country-block');

    // COUNTRY TITLE
    const title = document.createElement('h2');
    title.textContent = location;
    countryBlock.appendChild(title);

    // CARDS CONTAINER (INSIDE COUNTRY)
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    countryBlock.appendChild(cardsContainer);

    // append block to main container
    container.appendChild(countryBlock);

    // render cards into THIS container only
    await renderCard(today, 0, cardsContainer);
    await renderCard(nextDay, 1, cardsContainer);
    await renderCard(dayAfter, 2, cardsContainer);
};


const renderCard = async(data, day, container2) => {
    const card = document.createElement('div');
    card.classList.add('weather-card');

    const dayTitle = document.createElement('h2');

    if (day === 0) dayTitle.textContent = "Today";
    else if (day === 1) dayTitle.textContent = "Tomorrow";
    else dayTitle.textContent = "Day After";

    const weatherIcon = document.createElement('img');
    weatherIcon.src = getIconUrl(data.icon);

    const temp = document.createElement("div");
    temp.textContent = `Temperature: ${data.temp}°`;

    const condition = document.createElement('div');
    condition.textContent = "Conditions: " + data.condition;
    // const gifURL = await loadGifs(data.condition);
    // card.style.backgroundImage = `url(${gifURL})`;

    const details = document.createElement('div');

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.humidity}%`;

    const wind = document.createElement('p');
    wind.textContent = `Wind Speed: ${data.wind} km/h`;

    const precip = document.createElement('p');
    precip.textContent = `Precipitation: ${data.precip} mm`;

    details.appendChild(humidity);
    details.appendChild(wind);
    details.appendChild(precip);

    card.appendChild(dayTitle);
    card.appendChild(weatherIcon);
    card.appendChild(temp);
    card.appendChild(condition);
    card.appendChild(details);

    container2.appendChild(card);
};

const getIconUrl = (icon) => {
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${icon}.png`;
};

const parseWeather = (data, day=0) => {
    const today = data.days[day];

    return {
        location: data.resolvedAddress,
        temp: today.temp,
        humidity: today.humidity,
        wind: today.windspeed,
        condition: today.conditions,
        precip: today.precip,
        icon: today.icon,
    };
};