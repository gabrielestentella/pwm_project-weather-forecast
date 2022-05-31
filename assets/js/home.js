var darkModeActivation = {};

document.addEventListener('DOMContentLoaded', function () {
	// don't want to show images until they are loaded
	var images = document.querySelectorAll("img");
	images.forEach(element => {
		element.style.display = "none";
	})

  var checkbox = document.querySelector('input[type="checkbox"]');

  // check if there is a visaulization option stored in local storage
  var actualDate = new Date().getTime();
  if(localStorage.getItem('darkmode')) {
		if((actualDate - JSON.parse(localStorage.getItem('darkmode')).date) > 8640000) { //if there is an option, and it is older than 24h, delete that option
				localStorage.removeItem('darkmode');
				darkModeActivation = {
					darkMode: false,
					date: new Date().getTime(),
				};
				localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation) );
			}
  	} else {
	  	darkModeActivation = { //if there is not an option, set it to light mode
				darkMode: false,
				date: new Date().getTime(),
			};
			localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation) );
  	}
  
  if(JSON.parse(localStorage.getItem('darkmode')).darkMode){ //if the option is set to dark mode, apply the dark mode
		checkbox.checked = true;
		dark();
	}

  checkbox.addEventListener('change', function () { //make working the checkbox to change visualization
    if (checkbox.checked) {
      dark();
    } else {
      light();
    }
  });

  document.getElementById('search-loc').addEventListener('keypress', e => { //pressing the enter button in the search bar, it starts the research
  	if(e.key === 'Enter'){
  		e.preventDefault();
  		search();
  	}
  });


  // modal for login/register
	var modal = document.getElementById("popup");
	var openLogin = document.getElementById("openLogin");
	var span = document.getElementsByClassName("close")[0];
	var registerBtn = document.getElementsByClassName("registerBtn");
	var loginBtn = document.getElementById("loginBtn");
	var login = document.getElementById("login");
	var register = document.getElementById("register");
	var carInd = document.getElementsByClassName("carousel-indicators")[0];
	openLogin.onclick = async function() {
		c = await getCookie();
		if (c) { //if there is a cookie, the user is authenticated, so it loads the private page of the user, taking informations from the cookie
			window.open(`private_${c}`, '_self');
		} else { //if there is not a cookie, the user must log in o register
			modal.style.display = "block";
	  	carInd.style.visibility = "hidden";
		}
	}
	span.onclick = function() { //x to close the modal
	  	modal.style.display = "none";
	  	carInd.style.visibility = "visible";
	}
	registerBtn[0].onclick = function () {//link to register page
		login.style.display = "none";
		register.style.display = "inline-block";
	}
	registerBtn[1].onclick = function () {
		login.style.display = "none";
		register.style.display = "inline-block";
		modal.style.display = "block";
	  carInd.style.visibility = "hidden";
	}
	loginBtn.onclick = function () {//link to login page
		login.style.display = "inline-block";
		register.style.display = "none";
	}
	window.onclick = function(event) {//if the user clicks anywhere in the page outside the modal, it closes
	  if (event.target == modal) {
	    modal.style.display = "none";
	    carInd.style.visibility = "visible";
	  }
	  document.getElementById('error').style.display = 'none';
	}

	getError(); //check errors
});


// service worker to load data fromo api calls
let workerApi = new Worker('js/api-request_service-worker.js');

workerApi.postMessage({
  apiUrlMilano: "https://api.openweathermap.org/data/2.5/weather?lat=45.464007&units=metric&lon=9.190242&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlLondra: "https://api.openweathermap.org/data/2.5/weather?lat=51.502100&units=metric&lon=-0.140071&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlParigi: "https://api.openweathermap.org/data/2.5/weather?lat=48.856386&units=metric&lon=2.295343&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlNy: "https://api.openweathermap.org/data/2.5/weather?lat=40.779897&units=metric&lon=-73.968565&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlLa: "https://api.openweathermap.org/data/2.5/weather?lat=34.052234&units=metric&lon=-118.243685&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlSydney: "https://api.openweathermap.org/data/2.5/weather?lat=-33.865143&units=metric&lon=151.209900&appid=4da6d8179a32da39c51e22987d4e663e",
  apiUrlTokyo: "https://api.openweathermap.org/data/2.5/weather?lat=35.685013&units=metric&lon=139.752445&appid=4da6d8179a32da39c51e22987d4e663e",
});
workerApi.addEventListener('message', function (e) {
      if (e.data.status === 'OK') {
          document.getElementById('mil-temp').innerText = e.data.tempMilano + "°C";
					document.getElementById('mil-icon').src = e.data.iconMil;
					document.getElementById('lon-temp').innerText = e.data.tempLondra + "°C";
					document.getElementById('lon-icon').src = e.data.iconLon;
					document.getElementById('par-temp').innerText = e.data.tempParigi + "°C";
					document.getElementById('par-icon').src = e.data.iconPar;
					document.getElementById('ny-temp').innerText = e.data.tempNy + "°C";
					document.getElementById('ny-icon').src=e.data.iconNy;
					document.getElementById('la-temp').innerText = e.data.tempLa + "°C";
					document.getElementById('la-icon').src = e.data.iconLa;
					document.getElementById('syd-temp').innerText = e.data.tempSydney + "°C";
					document.getElementById('syd-icon').src=e.data.iconSyd;
					document.getElementById('tk-temp').innerText = e.data.tempTokyo + "°C";
					document.getElementById('tk-icon').src = e.data.iconTk;
      } else {
          alert('error on executing the worker for API calls');
      }
  }, false);


// set the dark mode on all the webapp
function dark () {
	document.body.classList.add("dark-mode");
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

	darkModeActivation.darkMode = true;
	darkModeActivation.date = new Date().getTime();
	localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation) );
}

// set the light mode on all the webapp
function light () {
	var navbar = document.querySelector(".navbar");
	navbar.classList.add("navbar-light");
	navbar.classList.remove("navbar-dark");
	navbar.classList.remove("bg-dark");
	document.body.classList.remove("dark-mode");
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

	darkModeActivation.darkMode = false;
	darkModeActivation.date = new Date().getTime();
	localStorage.setItem( 'darkmode', JSON.stringify(darkModeActivation) );
}


// service worker to load photo in the home page
let workerPhoto = new Worker('js/photo_service-worker.js');
var userLoc;
var weatherDes;
(async function getUserWeather () {
	navigator.geolocation.getCurrentPosition(async position => {
	const latitude = (position.coords.latitude.toFixed(6));
	const longitude = (position.coords.longitude.toFixed(6));
	const today = new Date();
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=it&appid=4da6d8179a32da39c51e22987d4e663e`;
	var response = await fetch(url);
	var jsonObj = await response.json();
	userLoc = jsonObj.name;
	weatherDes = jsonObj.weather[0].description;
	document.getElementById('userLocation').innerText = userLoc;
	document.getElementById('user-weather').innerText = weatherDes;
	document.getElementById('user-temp').innerText = jsonObj.main.temp + "°C";
	document.getElementById('user-humidity').innerText = jsonObj.main.humidity + "%";
	document.getElementById('user-wind').innerText = jsonObj.wind.speed + " m/s";
	console.log(jsonObj);

	workerPhoto.postMessage({
		userLocation : userLoc,
		weatherDescription : weatherDes,
	});
	workerPhoto.addEventListener('message', function(e) {
		if(e.data.status === 'OK') {
			document.getElementById('user-photo').src = e.data.url;
			var images = document.querySelectorAll("img");
	  	images.forEach(element => {
			element.style.display = "inline-block";
			})
		} else {
		alert('error on executing the worker to load photos');
		}
	})
	})
})();

// search a city from the search bar
function search () {
	var loc = document.getElementById('search-loc');
	console.log(loc.value);
	window.open(`search_${loc.value}`, '_self');

}


// check if there are some error and show them in an alert banner
async function getError() {
  	var errorBanner = document.getElementById('error');
	  var response = await fetch('http://127.0.0.1:3000/get_errors');
	  var jsonObj = await response.json();
	  if (jsonObj.errorOccured) {
	  	errorBanner.style.display = 'inline-block';
	  	errorBanner.innerText = jsonObj.errorMessage;
	  }
	};

// check if there are cookies making a request to the server
	async function getCookie() {
		var response = await fetch('http://127.0.0.1:3000/cookies');
		jsonObj = await response.json();
		console.log(await jsonObj);
			return await jsonObj;
	}