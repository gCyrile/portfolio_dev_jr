const apiKey = "dbcd5a13b95b423ff89a19a88b11b2ce"; // remplace par ta clé API

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "<p>Veuillez entrer une ville.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
    );
    const data = await res.json();

    if (res.status !== 200) {
      result.innerHTML = "<p>Ville introuvable.</p>";
      return;
    }

    const { name, main, weather, wind } = data;
    result.innerHTML = `
      <h2>${name}</h2>
      <p>${weather[0].description}</p>
      <p>🌡 Température : ${main.temp} °C</p>
      <p>💧 Humidité : ${main.humidity}%</p>
      <p>🌬 Vent : ${wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="icône météo">
    `;
  } catch (error) {
    console.error(error);
    result.innerHTML = "<p>Erreur lors de la récupération des données.</p>";
  }
}
