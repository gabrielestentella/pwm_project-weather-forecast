document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      dark();
      console.log('Dark mode on');
    } else {
      light();
      console.log('Dark mode off');
    }
  });
});

function dark () {
	var body = document.body;
		body.classList.add("dark-mode");
	var navbar = document.querySelector(".navbar");
		navbar.classList.remove("navbar-light");
		navbar.classList.add("navbar-dark");
		navbar.classList.add("bg-dark");
	var plh = document.querySelectorAll(".placeholder");
		plh.forEach(element => element.style.color = "#222529");
	var cards = document.querySelectorAll(".card-body");
		cards.forEach(element => element.classList.add("dark-mode"));
	var buttons = document.querySelectorAll(".card-body > .btn");
		buttons.forEach(element => element.classList.add("btn-outline-light"));
		buttons.forEach(element => element.classList.remove("btn-outline-dark"));
	var overlay = document.querySelectorAll(".overlay");
		overlay.forEach(element => element.classList.add("bg-bl"));
		overlay.forEach(element => element.classList.remove("bg-wh"));
}

function light () {
	var navbar = document.querySelector(".navbar");
		navbar.classList.add("navbar-light");
		navbar.classList.remove("navbar-dark");
		navbar.classList.remove("bg-dark");
	var body = document.body;
		body.classList.remove("dark-mode");
	var cards = document.querySelectorAll(".card-body");
		cards.forEach(element => element.classList.remove("dark-mode"));
	var buttons = document.querySelectorAll(".card-body > .btn");
		buttons.forEach(element => element.classList.remove("btn-outline-light"));
		buttons.forEach(element => element.classList.add("btn-outline-dark"));
	var overlay = document.querySelectorAll(".overlay");
		overlay.forEach(element => element.classList.add("bg-wh"));
		overlay.forEach(element => element.classList.remove("bg-bl"));
	var plh = document.querySelectorAll(".placeholder");
		plh.forEach(element => element.style.color = "#E2E5F1");
}

async function getWeather () {
	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45.464007&units=metric&lon=9.190242&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('mil-temp').innerText = jsonObj.main.temp + "°C";
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "1em";
	document.getElementById('mil-icon').appendChild(img);

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=51.502100&units=metric&lon=-0.140071&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('lon-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "1em";
	document.getElementById('lon-icon').appendChild(img);

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=48.856386&units=metric&lon=2.295343&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('par-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "1em";
	document.getElementById('par-icon').appendChild(img);

	var plh = document.querySelectorAll(".placeholder");
	plh.forEach(element => element.style.color = "#E2E5F1");

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=40.779897&units=metric&lon=-73.968565&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('ny-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "4em";
	document.getElementById('ny-icon').appendChild(img);

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=34.052234&units=metric&lon=-118.243685&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('la-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "4em";
	document.getElementById('la-icon').appendChild(img);

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-33.865143&units=metric&lon=151.209900&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('syd-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "4em";
	document.getElementById('syd-icon').appendChild(img);

	var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=35.685013&units=metric&lon=139.752445&appid=4da6d8179a32da39c51e22987d4e663e",{method:"GET"});
	var jsonObj = await response.json();
	console.log(jsonObj);
	document.getElementById('tk-temp').innerText = jsonObj.main.temp + "°C";
	
	var img = document.createElement("img");
	img.src="icons/" + jsonObj.weather[0].icon + ".svg";
	img.style.width = "4em";
	document.getElementById('tk-icon').appendChild(img);
}

getWeather();