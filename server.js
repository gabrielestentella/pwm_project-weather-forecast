const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const axios = require('axios');

// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const urlEncoded = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

//Express static file module
app.use(express.static(__dirname + '/assets'));

app.use(favicon(__dirname + '/views/favicon.ico'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/home.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/home.html');
});

app.get('/contact.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/contact.html');
});

app.get('/search_:cityname/', function (req, response) {
	const name = req.params.cityname;
	const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

	axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${nameCapitalised}&limit=1&appid=4da6d8179a32da39c51e22987d4e663e`)
	.then(async res => {
		lat = await res.data[0].lat;
		lon = await res.data[0].lon;
		country = await res.data[0].country;
		console.log(res.data[0]);
		axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&lang=it&appid=4da6d8179a32da39c51e22987d4e663e`)
		.then(async res => {
			jsonObj = await res.data;
			desc = jsonObj.current.weather[0].description;
			temp = jsonObj.current.temp;
			wind = jsonObj.current.wind_speed;
			hum = jsonObj.current.humidity;
			t_per = jsonObj.current.feels_like;
			clouds = jsonObj.current.clouds;
			tmax = jsonObj.daily[0].temp.max;
			tmin = jsonObj.daily[0].temp.min;
			t_wind = jsonObj.daily[0].wind_speed;
			t_hum = jsonObj.daily[0].humidity;
			t_desc = jsonObj.daily[0].weather[0].description;
			t_clouds = jsonObj.daily[0].clouds;
			desc = await desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
			t_desc = await t_desc.charAt(0).toUpperCase() + t_desc.slice(1).toLowerCase();
			if (jsonObj.alerts) {
				al = jsonObj.alerts[0].event;
				danger = 'danger';
			}else {
				al = 'Nessuna Allerta';
				danger = 'success';
			}
		})
		.catch(error => {
			console.log(error.message);
		})
	})
	.catch(error => {
		console.log(error.message);
	})
	.then(res => {
		axios.get(`https://api.unsplash.com/search/photos?page=1&query=${nameCapitalised}&client_id=Yme6ZcumIXpWryQ0DPc249CE0ua2Mxh66Y-4W2gPAAc`)
		.then(async res => {
			if (res.data.total) {
				url = await res.data.results[0].urls.regular;
			} else {
				url = null;
			}
			setTimeout(async () => {
				response.render('city_template.ejs', {
					title : nameCapitalised, 
					country : country,  
					description : desc, 
					temperature : temp, 
					wind : wind, 
					humidity : hum, 
					temperature_perc : t_per, 
					clouds : clouds, 
					tomorrow_description : t_desc, 
					tomorrow_max_temperature : tmax, 
					tomorrow_min_temperature : tmin, 
					tomorrow_wind : t_wind, 
					tomorrow_humidity : t_hum, 
					tomorrow_clouds : t_clouds, 
					url : url, 
					danger : danger,
					alert : al});
			}, 200);
		})
	})
});

app.listen(port);
console.log('Server started at http://localhost:' + port);