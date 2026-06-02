const searchInput = document.getElementById("city-search");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("currentDate");
const mainTemp = document.getElementById("main-temp");
const images = document.getElementById("images");
const weatherDesc = document.getElementById("weather-desc");
const InsightforCity = document.getElementById("Insight-for-city");

const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime  = document.getElementById("sunset-time");
const feelsLikeDash = document.getElementById("feels-like-dash");
const humidityDash = document.getElementById("humidity-dash"); 
const windDash = document.getElementById("wind-dash");
const visibilityDash = document.getElementById("visibility-dash");
const pressureDash = document.getElementById("pressure-dash");
const cloudDash = document.getElementById("cloud-dash");
const weatherDesc2 = document.getElementById("weather-desc-2");
const minimum = document.getElementById("minimum");
const maximum = document.getElementById("maximum");
const locations = document.getElementById("location");

const statsCity = document.getElementById("Detailed-stats-city");
const projectionForCity = document.getElementById("projection-for-city");
const climateTrendsForCity = document.getElementById("climate-trends-for-city");
const concentrationInCity = document.getElementById("concentration-In-City");
const statusForCity = document.getElementById("status-For-City");
const detailedContainer = document.querySelector(".main-Detailed-container");

const timeElements = [
    document.getElementById("Time1"), document.getElementById("Time2"), 
    document.getElementById("Time3"), document.getElementById("Time4"),
    document.getElementById("Time5"), document.getElementById("Time6"), 
    document.getElementById("Time7"), document.getElementById("Time8")
];

const imgElements = [
    document.getElementById("img1"), document.getElementById("img2"), 
    document.getElementById("img3"), document.getElementById("img4"),
    document.getElementById("img5"), document.getElementById("img6"), 
    document.getElementById("img7"), document.getElementById("img8")
];

const tempElements = [
    document.getElementById("temp1"), document.getElementById("temp2"), 
    document.getElementById("temp3"), document.getElementById("temp4"),
    document.getElementById("temp5"), document.getElementById("temp6"), 
    document.getElementById("temp7"), document.getElementById("temp8")
];

const infoElements = [
    document.getElementById("weatherinfo1"), document.getElementById("weatherinfo2"), 
    document.getElementById("weatherinfo3"), document.getElementById("weatherinfo4"),
    document.getElementById("weatherinfo5"), document.getElementById("weatherinfo6"), 
    document.getElementById("weatherinfo7"), document.getElementById("weatherinfo8")
];

const humidElements = [
    document.getElementById("humidity1"), document.getElementById("humidity2"), 
    document.getElementById("humidity3"), document.getElementById("humidity4"),
    document.getElementById("humidity5"), document.getElementById("humidity6"), 
    document.getElementById("humidity7"), document.getElementById("humidity8")
];



const Scheduled = [
    document.getElementById("Scheduled1"), document.getElementById("Scheduled2"),
    document.getElementById("Scheduled3"), document.getElementById("Scheduled4"),
    document.getElementById("Scheduled5")
]

const ScheduledImage = [
    document.getElementById("ScheduledImage1"), document.getElementById("ScheduledImage2"),
    document.getElementById("ScheduledImage3"), document.getElementById("ScheduledImage4"),
    document.getElementById("ScheduledImage5")
]

const ScheduledTemp = [
    document.getElementById("ScheduledTemp1"), document.getElementById("ScheduledTemp2"),
    document.getElementById("ScheduledTemp3"), document.getElementById("ScheduledTemp4"),
    document.getElementById("ScheduledTemp5")
]

const ScheduledDesc = [
    document.getElementById("ScheduledDesc1"), document.getElementById("ScheduledDesc2"),
    document.getElementById("ScheduledDesc3"), document.getElementById("ScheduledDesc4"),
    document.getElementById("ScheduledDesc5")
]

const ScheduledHumidity = [
    document.getElementById("ScheduledHumidity1"), document.getElementById("ScheduledHumidity2"),
    document.getElementById("ScheduledHumidity3"), document.getElementById("ScheduledHumidity4"),
    document.getElementById("ScheduledHumidity5")
]

const ScheduledWind = [
    document.getElementById("ScheduledWind1"), document.getElementById("ScheduledWind2"), 
    document.getElementById("ScheduledWind3"), document.getElementById("ScheduledWind4"), 
    document.getElementById("ScheduledWind5") 
]


const SystemStatusDecs = document.getElementById("System-Status-decs");
const SystemStatusTemp = document.getElementById("System-Status-Temp");
const SecureForCity = document.getElementById("Secure-For-City");
const mainStatuscard = document.getElementById("main-Status-card");


const mainAqiInfo = document.getElementById("main-aqi-info");
const aqiInfoCity = document.getElementById("aqi-info-city");
const aqiRated = document.getElementById("aqi-rated");
const aqiScale = document.getElementById("aqi-scale");
const mainAqiContainer = document.getElementById("main-aqi-container");
const fineParticles = document.getElementById("Fine-Particles");
const coarseParticles = document.getElementById("Coarse-Particles");
const nitrogenDioxide = document.getElementById("Nitrogen-Dioxide");
const ozoneLevel = document.getElementById("Ozone-Level");
const fineParticlesRange = document.getElementById("Fine-Particles-Range");
const coarseParticlesRange = document.getElementById("Coarse-Particles-Range");
const nitrogenDioxideRange = document.getElementById("Nitrogen-Dioxide-Range");
const ozoneLevelRange = document.getElementById("Ozone-Level-Range");
const aqiBox = document.querySelector(".main-aqi-box");
const aqiCircleElement = document.querySelector(".aqi-circle");


if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", fetchApi);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") fetchApi();
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if ((currentPage === "" || currentPage === "index.html") && href.includes("index.html")) {
            link.classList.add('active');
        } 
        else if (currentPage !== "" && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});



async function fetchApi() {
    const key = "2ce5c7018f588cdc8bdaa25c3384688e";
    
    let city = localStorage.getItem("lastSearchedCity") || "Karachi"; 
    
    if (searchInput && searchInput.value.trim() !== "") {
        city = searchInput.value.trim();
    }

    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        if (!res.ok) throw new Error("City lookup failed");
        
        let data = await res.json();
        
        localStorage.setItem("lastSearchedCity", data.name);

        render(data);

        if(searchInput) searchInput.value = "";
    } catch (error) {
        console.log("Fetch Error Context:", error);


        Swal.fire({
            icon: "error",
            title: "City Not Found",
            text: "Please enter a valid city name",
            confirmButtonColor: "#3085d6"
        });

        
        if (searchInput) searchInput.value = "";
    }
}


fetchApi();



function render(receiveData) {
    if (!receiveData || !receiveData.sys) return;

    // if (searchInput) searchInput.value = receiveData.name;

    if (InsightforCity) InsightforCity.innerText = receiveData.name;
    if (cityName) cityName.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
  
   
    let myDate = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (currentDate) currentDate.innerText = `${days[myDate.getDay()]}, ${months[myDate.getMonth()]} ${myDate.getDate()}`;
    if (mainTemp) mainTemp.innerText = `${Math.round(receiveData.main.temp)}°`;
    
    if (images && receiveData.weather?.[0]) {
        images.src = `https://openweathermap.org/img/wn/${receiveData.weather[0].icon}@4x.png`;
    }
    if (weatherDesc && receiveData.weather?.[0]) {
        weatherDesc.innerText = receiveData.weather[0].description;
    }

   
    let sunriseDate = new Date(receiveData.sys.sunrise * 1000);
    let sunsetDate = new Date(receiveData.sys.sunset * 1000);
   
    if (sunriseTime) sunriseTime.innerText = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (sunsetTime) sunsetTime.innerText = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (feelsLikeDash) feelsLikeDash.innerText = `${Math.round(receiveData.main.feels_like)}`;
    if (humidityDash) humidityDash.innerText = `${receiveData.main.humidity}`;
    if (windDash) windDash.innerText = `${Math.round(receiveData.wind.speed * 3.6)} km/h`;
    if (visibilityDash) visibilityDash.innerText = `${Math.round(receiveData.visibility / 1000)} km`;
    if (pressureDash) pressureDash.innerText = `${Math.round(receiveData.main.pressure)} hPa`;
    if (cloudDash) cloudDash.innerText = `${receiveData.clouds.all}%`;

    if (weatherDesc2 && receiveData.weather?.[0]) {
        weatherDesc2.innerText = receiveData.weather[0].main;
    }

    if (minimum) minimum.innerText = `${Math.round(receiveData.main.temp_min)}`;
    if (maximum) maximum.innerText = `${Math.round(receiveData.main.temp_max)}`;
    if (locations) locations.innerText = `${receiveData.coord.lat.toFixed(2)}°N, ${receiveData.coord.lon.toFixed(2)}°E`;
    
   
    if (statsCity) statsCity.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
    if (projectionForCity) projectionForCity.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
    if (climateTrendsForCity) climateTrendsForCity.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
    if (concentrationInCity) concentrationInCity.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
    if (statusForCity) statusForCity.innerText = `${receiveData.name}, ${receiveData.sys.country}`;
    if (SecureForCity) SecureForCity.innerText = `${receiveData.name}`;
    if(aqiInfoCity) aqiInfoCity.innerText = `${receiveData.name}`;
   

    if(SystemStatusDecs) SystemStatusDecs.innerText = receiveData.weather[0].main;
    if(SystemStatusTemp) SystemStatusTemp.innerText = `${Math.round(receiveData.main.temp)}°c`;
    if (mainStatuscard) {

        let temp = Math.round(receiveData.main.temp);

        if (temp >= 40) {

            mainStatuscard.innerHTML = `
            <div class="main-Status-box" style=" background: linear-gradient(135deg, rgba(54, 26, 26, 0.95), rgba(41, 18, 18, 0.9));border: 1px solid rgba(255, 60, 60, 0.4);box-shadow: 0 10px 40px rgba(255, 0, 0, 0.15);">
                 
                <div class="icon-wrap-box" style=" background: rgba(255, 60, 60, 0.15); color: #ff4d4d; box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#fb2c36;"></i>
                </div>
        
                <div class="main-heading-box">
                    <h4 style="color:#fb2c36;">Critical Heat Warning</h4>
                    <h3 style="color:#fb2c36;">
                    "Extreme heat warning in effect. High risk of heatstroke. Stay in shaded areas and increase water intake."
                    </h3>
                </div>
        
                <div class="Ambient-box" style="border: 1px solid rgba(255, 60, 60, 0.3); background: rgba(255, 60, 60, 0.2);">
                    <small>Ambient</small>
                    <h3 style="color:#fb2c36;">${temp}°C</h3>
                </div>
        
            </div>`;
        
       } 

    }
   




    const { lat, lon } = receiveData.coord;

    fetchApi2(lat, lon);

    fetchApi3(lat, lon);
    

}



async function fetchApi2(lat, lon) {
    const key = "2ce5c7018f588cdc8bdaa25c3384688e";
    try {
        let ress = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`);
        let data2 = await ress.json();
        render2(data2);
    } catch (error) {
        console.log("Forecast Chain Fetch Error:", error);
    }
}



function render2(receiveData2) {
    
    
    if (!receiveData2 || !receiveData2.list) return;

   
    for (let i = 0; i < 8; i++) {
        let forecast = receiveData2.list[i];
        if (!forecast) break;

        let rawDate = new Date(forecast.dt * 1000);
        let hours = rawDate.getHours();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        let timeString = `${hours} ${ampm}`;

        if (timeElements[i]) timeElements[i].innerText = timeString;
        if (imgElements[i]) imgElements[i].src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        if (tempElements[i]) tempElements[i].innerText = `${Math.round(forecast.main.temp)}°`;
        if (infoElements[i]) infoElements[i].innerText = forecast.weather[0].description;
        if (humidElements[i]) humidElements[i].innerText = `${forecast.main.humidity}%`;
    }

    
    if (detailedContainer) {
        detailedContainer.innerHTML = ""; 
        
        for (let i = 0; i < 8; i++) {
            let item = receiveData2.list[i];
            if (!item) break;

            let d = new Date(item.dt * 1000);
            let daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let timeFormatted = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let displayTimestamp = `${daysArr[d.getDay()]} ${timeFormatted}`;

            let rowHtml = `
                <div class="main-Detailed-box">
                    <div class="time-stamp">
                        <h3>${displayTimestamp}</h3>
                    </div>
                    <div class="temp-condition">
                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" style="width:40px; height:40px;" />
                        <h2>${Math.round(item.main.temp)}<span>°C</span></h2>
                    </div>
                    <div class="detail-metric">
                        <span><i class="fa-solid fa-wind text-info"></i> Wind</span>
                        <p>${Math.round(item.wind.speed * 3.6)} km/h</p>
                    </div>
                    <div class="detail-metric">
                        <span><i class="fa-solid fa-temperature-half text-warning"></i> Feels</span>
                        <p>${Math.round(item.main.feels_like)}°</p>
                    </div>
                    <div class="status-badge">
                        <h4>${item.weather[0].main}</h4>
                    </div>
                </div>
            `;
            detailedContainer.innerHTML += rowHtml;
        }
    }



    for (let i = 0; i < 5; i++) {
    let forecast = receiveData2.list[i * 8]; 
    if (!forecast) break;

    let myDate = new Date(forecast.dt * 1000);

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (Scheduled[i]) Scheduled[i].innerText = `${days[myDate.getDay()]}, ${myDate.getDate()} ${months[myDate.getMonth()]}`;

    if (ScheduledImage[i]) ScheduledImage[i].src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

    if (ScheduledTemp[i]) ScheduledTemp[i].innerText = `${Math.round(forecast.main.temp)}°`;

    if (ScheduledDesc[i]) ScheduledDesc[i].innerText = forecast.weather[0].description;

    if (ScheduledHumidity[i]) ScheduledHumidity[i].innerText = `${forecast.main.humidity}%`;

    if (ScheduledWind[i]) ScheduledWind[i].innerText = `${Math.round(forecast.wind.speed * 3.6)} km/h`;
}



}



async function fetchApi3(lat, lon) {
    const key = "2ce5c7018f588cdc8bdaa25c3384688e";
    try {
        let res = await  fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`);
        let data3 = await res.json();
        render3(data3);
    } catch (error) {
        console.log("Air pollution Fetch Error:", error);
    }
}



function render3(receiveData3) {
    
    if (!receiveData3 || !receiveData3.list || !receiveData3.list[0]) return;
    
    const components = receiveData3.list[0].components;
    const aqiValue = receiveData3.list[0].main.aqi; 

   
    if (fineParticles) fineParticles.innerText = components.pm2_5.toFixed(1);
    if (coarseParticles) coarseParticles.innerText = components.pm10.toFixed(1);
    if (nitrogenDioxide) nitrogenDioxide.innerText = components.no2.toFixed(1);
    if (ozoneLevel) ozoneLevel.innerText = components.o3.toFixed(1);


    if (fineParticlesRange) {
        let pm25Width = Math.min((components.pm2_5 / 75) * 100, 100);
        fineParticlesRange.style.setProperty('--bar-width', pm25Width + '%');
    }
    if (coarseParticlesRange) {
        let pm10Width = Math.min((components.pm10 / 100) * 100, 100);
        coarseParticlesRange.style.setProperty('--bar-width', pm10Width + '%');
    }
    if (nitrogenDioxideRange) {
        let no2Width = Math.min((components.no2 / 150) * 100, 100);
        nitrogenDioxideRange.style.setProperty('--bar-width', no2Width + '%');
    }
    if (ozoneLevelRange) {
        let o3Width = Math.min((components.o3 / 150) * 100, 100);
        ozoneLevelRange.style.setProperty('--bar-width', o3Width + '%');
    }

    
    let statusText = "Moderate";
    let statusColor = "#f59e0b"; 
    let statusBorder = "rgba(245, 158, 11, 0.3)";
    let statusBg = "rgba(245, 158, 11, 0.06)";

    if (aqiValue === 1) {
        statusText = "Excellent";
        statusColor = "#10b981"; 
        statusBorder = "rgba(16, 185, 129, 0.3)";
        statusBg = "rgba(16, 185, 129, 0.06)";
    } else if (aqiValue === 2) {
        statusText = "Good";
        statusColor = "#34d399"; 
        statusBorder = "rgba(52, 211, 153, 0.3)";
        statusBg = "rgba(52, 211, 153, 0.06)";
    } else if (aqiValue === 3) {
        statusText = "Moderate";
        statusColor = "#f59e0b"; 
        statusBorder = "rgba(245, 158, 11, 0.3)";
        statusBg = "rgba(245, 158, 11, 0.06)";
    } else if (aqiValue === 4) {
        statusText = "Poor";
        statusColor = "#ef4444"; 
        statusBorder = "rgba(239, 68, 68, 0.3)";
        statusBg = "rgba(239, 68, 68, 0.06)";
    } else if (aqiValue === 5) {
        statusText = "Very Poor";
        statusColor = "#b91c1c"; 
        statusBorder = "rgba(185, 28, 28, 0.3)";
        statusBg = "rgba(185, 28, 28, 0.06)";
    }


    if (mainAqiInfo) {
        mainAqiInfo.innerText = statusText;
        mainAqiInfo.style.color = statusColor;
        mainAqiInfo.style.textShadow = `0 0 20px ${statusBorder}`;
    }
    if (aqiRated) aqiRated.innerText = statusText.toLowerCase();
    if (aqiScale) aqiScale.innerText = aqiValue;

    if (aqiBox) {
        aqiBox.style.borderColor = statusBorder;
    }
    if (aqiCircleElement) {
        aqiCircleElement.style.borderColor = statusColor;
        aqiCircleElement.style.background = statusBg;
        aqiCircleElement.style.boxShadow = `0 0 25px ${statusBorder}`;
        
        const circleH2 = aqiCircleElement.querySelector("h2");
        if (circleH2) circleH2.style.color = statusColor;
    }


}