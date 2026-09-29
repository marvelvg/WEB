// EXTERNAL API
const cityElement = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

searchButton.addEventListener("click", function () {
    getWeather();
});

async function getWeather() {
    const city = cityElement.value.trim();

    if (!city) {
        console.log("Masukkan nama kota terlebih dahulu.");
        return;
    }
// EXTERNAL API UPDATEDd
    try {
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.log("Kota tidak ditemukan.");
            return;
        }

        const { latitude, longitude } = geoData.results[0];
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=relative_humidity_2m`;
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        temperatureElement.textContent = `Temperature: ${weatherData.current.temperature_2m}°C`;
        humidityElement.textContent = `Humidity: ${weatherData.hourly.relative_humidity_2m[0]}%`;
        windElement.textContent = `Wind: ${weatherData.current.wind_speed_10m} km/h`;
    } catch (error) {
        console.error("Gagal mengambil data cuaca:", error);
    }
}


