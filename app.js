const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const details = document.querySelector(".details");
const error404 = document.querySelector(".not-found");


search.addEventListener("click",()=>{
    const APIKey = "{yourAPIKey}";
    const city = document.querySelector(".search-box input").value;

    if(city ===""){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response=>response.json())
    .then(json=>{
        if(json.code === "404"){
            container.style.height = "25rem";
            weatherBox.style.display = "none";
            details.style.display = "none";
            error404.classList.add("fadeIn");
            return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");


        const img = document.querySelector(".weather-box img");
        const temp = document.querySelector(".weather-box .temperature");
        const desc = document.querySelector(".weather-box .description");
        const hum = document.querySelector(".details .humidity");
        const wind = document.querySelector(".details .wind");


        switch (json.weather[0].main){
            case 'Clear':
                img.src = "img/clear.png";
                break;
            case 'Cloud':
                img.src = "img/cloud.png";
                break;
            case 'Haze':
                img.src = "img/haze.png";
                break;
            case 'Rain':
                img.src = "img/rain.png";
                break;
            case 'Snow':
                img.src = "img/snow.png";
                break;
            default:
                img.src = "";
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].desc}`;
        hum.innerHTML = `${json.main.hum}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


        weatherBox.style.display='';
        details.style.display='';
        container.style.height='36.875rem';
        weatherBox.classList.add("fadeIn");
        details.classList.add("fadeIn");
    })
})