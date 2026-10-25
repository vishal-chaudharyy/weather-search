
const input = document.querySelector(".inp");
const searchbtn = document.querySelector("#searchbtn");
const weatherImg = document.querySelector("#img");
const cityname=document.querySelector("#cityname");
const temparature = document.querySelector(".temprature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind-speed");

async function check(city) {

    if (!city) {
        return;
    }

    const api = "5e48dd9bb458513d0d2aec50e4aa70fd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (!response.ok) {
            alert("City not found! Please enter a valid city.");
            return;
        }

        // Save city only when API request is successful
        localStorage.setItem("city", city);
        cityname.innerHTML=weather_data.name;
        temparature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${weather_data.wind.speed} Km/h`;


        switch (weather_data.weather[0].main) {
            case "Clear":
                weatherImg.src = "assets/sun.png";
                break;

            case "Clouds":
                weatherImg.src = "assets/cloud.png";
                break;

            case "Rain":
                weatherImg.src = "assets/rain.png";
                break;

            case "Fog":
                weatherImg.src = "assets/fog.png";
                break;

            default:
                weatherImg.src = "assets/cloud.png";
        }

    } catch (error) {
        alert("Weather data load nahi hua. Internet check karo.");
    }
}
searchbtn.addEventListener("click", () => {
    check(input.value);
    input.value = "";
});

// Load last searched city when website opens
const savedCity = localStorage.getItem("city");

if (savedCity) {
    check(savedCity);
}


