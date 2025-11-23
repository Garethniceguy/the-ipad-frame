// ===============================
// 1. SLIDESHOW IMAGE LIST
// ===============================
//
// IMPORTANT:
// Upload your photos to the "photos" folder in GitHub.
// Then list the filenames here exactly.

const images = [
  "photos/photo1.jpg",
  "photos/photo2.jpg",
  "photos/photo3.jpg"
];

// Time between photos (ms)
const SLIDE_INTERVAL_MS = 10000;

// ===============================
// 2. CLOCK + DATE
// ===============================

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
}

setInterval(updateClock, 1000);
updateClock();

// ===============================
// 3. WEATHER — WREXHAM
// ===============================
// Using Open-Meteo (no API key needed)

const latitude = 53.0466;
const longitude = -2.9913;

function weatherCodeToText(code) {
  if (code === 0) return "Clear";
  if ([1,2,3].includes(code)) return "Partly cloudy";
  if ([45,48].includes(code)) return "Fog";
  if ([51,53,55].includes(code)) return "Drizzle";
  if ([61,63,65].includes(code)) return "Rain";
  if ([80,81,82].includes(code)) return "Showers";
  if ([95].includes(code)) return "Thunderstorm";
  return "Weather";
}

async function fetchWeather() {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
      `&longitude=${longitude}&current_weather=true&timezone=Europe%2FLondon`;

    const res = await fetch(url);
    const data = await res.json();

    const current = data.current_weather;
    const temp = Math.round(current.temperature);
    const summary = weatherCodeToText(current.weathercode);

    document.getElementById("weather-temp").textContent = `${temp}°C`;
    document.getElementById("weather-summary").textContent = summary;

  } catch {
    document.getElementById("weather-summary").textContent = "Unavailable";
  }
}

fetchWeather();
setInterval(fetchWeather, 30 * 60 * 1000); // Update every 30 minutes

// ===============================
// 4. IMAGE SLIDESHOW
// ===============================

let currentIndex = 0;

function showNextImage() {
  const img = document.getElementById("slide-image");
  img.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex];
    img.classList.remove("fade-out");
  }, 500);
}

function startSlideshow() {
  document.getElementById("slide-image").src = images[0];
  setInterval(showNextImage, SLIDE_INTERVAL_MS);
}

window.addEventListener("load", startSlideshow);
