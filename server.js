const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const apiKeyOpenWeather = `${process.env.API_KEY_OPENWEATHER}`;
const apiKeyUnsplash = `${process.env.API_KEY_UNSPLASH}`;
const privateKey = `${process.env.PRIVATE_KEY}`;
const sessionKey = `${process.env.SESSION_KEY}`;
const urlEncoded = bodyParser.urlencoded({extended: false});
const DBUrl = process.env.DB_CONNECTION;
const DBName = process.env.DB_NAME;
const mongoClient = new MongoClient(DBUrl);
var errors = {
	errorOccured : false,
	errorMessage : '',
};

app.set('view engine', 'ejs');



//Express static file module
app.use(express.static(__dirname + '/assets'));

app.use(favicon(__dirname + '/views/favicon.ico'));

app.use(session({
	secret: sessionKey,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false, maxAge: 18000000}
	}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/home.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/home.html');
});

app.get('/contact.html', function (req, res) {
    res.sendFile('/Users/gabriele/Desktop/progetto_pwm/views/contact.html');
});

app.get('/get_errors', function (req, res) {
	res.send(errors);
	errors.errorOccured = false;
});

app.get('/cookies', function(req, res) {
if(req.session.city){
    	res.send(JSON.stringify(req.session.city));
    }else{
    	res.send('false');
    }
});

app.get('/private_:city/', function (req, response) {
	console.log(req.session);
	const name = req.params.city;
	const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	let h1;
	let lat;
	let lon;
	let country;
	let jsonObj;
	let w1;
	let t1;
	let uv1;
	let rp1;
	let ws1;
	let h2;
	let w2;
	let t2;
	let uv2;
	let rp2;
	let ws2;
	let h3;
	let w3;
	let t3;
	let uv3;
	let rp3;
	let ws3;
	let h4 ;
	let w4 ;
	let t4 ;
	let uv4 ;
	let rp4 ;
	let ws4 ;
	let h5; 
	let w5;
	let t5;
	let uv5;
	let rp5;
	let ws5;

	axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${nameCapitalised}&limit=1&appid=${apiKeyOpenWeather}`)
	.then(res => {
		console.log('1');
		lat = res.data[0].lat;
		lon = res.data[0].lon;
		country = res.data[0].country;
		console.log(res.data[0]);
		axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely&units=metric&lang=it&appid=${apiKeyOpenWeather}`)
		.then(res => {
			console.log('2');
			jsonObj = res.data;
			console.log(jsonObj);
			h1 = new Date(jsonObj.hourly[0].dt*1000).getHours();
			w1 = jsonObj.hourly[0].weather[0].description;
			t1 = jsonObj.hourly[0].temp;
			uv1 = jsonObj.hourly[0].uvi;
			rp1 = Math.trunc(jsonObj.hourly[0].pop*100);
			ws1 = jsonObj.hourly[0].wind_speed;
			h2 = new Date(jsonObj.hourly[1].dt*1000).getHours();
			w2 = jsonObj.hourly[1].weather[0].description;
			t2 = jsonObj.hourly[1].temp;
			uv2 = jsonObj.hourly[1].uvi;
			rp2 = Math.trunc(jsonObj.hourly[1].pop*100);
			ws2 = jsonObj.hourly[1].wind_speed;
			h3 = new Date(jsonObj.hourly[2].dt*1000).getHours();
			w3 = jsonObj.hourly[2].weather[0].description;
			t3 = jsonObj.hourly[2].temp;
			uv3 = jsonObj.hourly[2].uvi;
			rp3 = Math.trunc(jsonObj.hourly[2].pop*100);
			ws3 = jsonObj.hourly[2].wind_speed;
			h4 = new Date(jsonObj.hourly[3].dt*1000).getHours();
			w4 = jsonObj.hourly[3].weather[0].description;
			t4 = jsonObj.hourly[3].temp;
			uv4 = jsonObj.hourly[3].uvi;
			rp4 = jsonObj.hourly[3].pop*100;
			ws4 = jsonObj.hourly[3].wind_speed;
			h5 = new Date(jsonObj.hourly[4].dt*1000).getHours();
			w5 = jsonObj.hourly[4].weather[0].description;
			t5 = jsonObj.hourly[4].temp;
			uv5 = jsonObj.hourly[4].uvi;
			rp5 = Math.trunc(jsonObj.hourly[4].pop*100);
			ws5 = jsonObj.hourly[4].wind_speed;
			if (jsonObj.alerts) {
				al = jsonObj.alerts[0].event;
				danger = 'danger';
			}else {
				al = 'Nessuna Allerta';
				danger = 'success';
			}
		})
		.then(res => {
			console.log('3');
		response.render('private.ejs', 
			{title: nameCapitalised, 
				t1 : t1,
				t2 : t2,
				t3 : t3,
				t4 : t4,
				t5 : t5,
				h1 : h1,
				h2 : h2,
				h3 : h3,
				h4 : h4,
				h5 : h5,
				w1 : w1,
				w2 : w2,
				w3 : w3,
				w4 : w4,
				w5 : w5,
				uv1 : uv1,
				rp1 : rp1,
				uv2 : uv2,
				rp2 : rp2,
				uv3 : uv3,
				rp3 : rp3,
				uv4 : uv4,
				rp4 : rp4,
				uv5 : uv5,
				rp5 : rp5,
				ws1 : ws1,
				ws2 : ws2,
				ws3 : ws3,
				ws4 : ws4,
				ws5 : ws5,
				alert : al,
				danger : danger
			});
	});
	})
});

app.post('/register', urlEncoded, async (req, res) => {
	req.body.pass = await bcrypt.hash(req.body.pass, 10);
	const promise = insertDB('users', req.body);
	promise.then(value => { 
		req.session.city = req.body.city;
		const name = req.body.city;
		const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		res.render('private.ejs', {title : nameCapitalised});
	}, reason => {
		console.error(reason) ;
		errors.errorOccured = true;
		errors.errorMessage = 'Error 1064: cannot insert data into database';
		res.redirect('home.html');
	});
});


app.post('/login', urlEncoded, (req, res) => {
	const promise = checkLog('users', req.body);
	promise.then(value => { 
		req.session.city = value.city;
		const name = req.session.city;
		const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		res.render('private.ejs', {title : nameCapitalised});
	}, reason => {
		errors.errorOccured = true;
		errors.errorMessage = 'Error 401: unauthorized - ' + reason;
		res.redirect('home.html');
	});
});

app.post('/tips', urlEncoded, async (req, res) => {
	await mongoClient.connect();
    const database = mongoClient.db(DBName);
    const col = database.collection('tips');
    await col.update(
    	{_id : req.body.us_email},
    	{$set: req.body},
    	{upsert: true});
});

insertDB = async (collectionName, elementToInsert) => {

    try {
        await mongoClient.connect();
        const database = mongoClient.db(DBName);
        const col = database.collection(collectionName);
        const token = jwt.sign({id: elementToInsert.user_id}, privateKey, {expiresIn: '5h' });
        let result = await col.update(
            { _id: token },
            { $set: elementToInsert },
            { upsert: true });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

checkLog = async (collectionName, elementToSearch) => {

    try {
        await mongoClient.connect();
        const database = mongoClient.db(DBName);
        const col = database.collection(collectionName);
        const query = {user_id : elementToSearch.user_id};
        let result = await col.findOne(query);

      	if (!result) {
      		return Promise.reject('utente non registrato');
      	}

        try {
        	jwt.verify(result._id, privateKey);
        } catch (err) {
        	return Promise.reject('sessione scaduta');
        }

        if (await bcrypt.compare(elementToSearch.pass, result.pass)) {
        	return Promise.resolve(result);        	
        } else {
        	return Promise.reject('password errata');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}


//dinamic construction of the page when the user search something
app.get('/search_:cityname/', function (req, response) {
	const name = req.params.cityname;
	const nameCapitalised = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

	axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${nameCapitalised}&limit=1&appid=${apiKeyOpenWeather}`)
	.then(res => {
		lat = res.data[0].lat;
		lon = res.data[0].lon;
		country = res.data[0].country;
		console.log(res.data[0]);
		axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&lang=it&appid=${apiKeyOpenWeather}`)
		.then(res => {
			jsonObj = res.data;
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
			desc = desc.charAt(0).toUpperCase() + desc.slice(1).toLowerCase();
			t_desc = t_desc.charAt(0).toUpperCase() + t_desc.slice(1).toLowerCase();
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
		axios.get(`https://api.unsplash.com/search/photos?page=1&query=${nameCapitalised}&client_id=${apiKeyUnsplash}`)
		.then(res => {
			if (res.data.total) {
				url = res.data.results[0].urls.regular;
			} else {
				url = null;
			}
			setTimeout(() => {
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