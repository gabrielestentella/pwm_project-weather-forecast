self.addEventListener('message', async function(e){
	let data = e.data;

	var response = await fetch(data.apiUrlMilano);
	var jsonObj = await response.json();
	var tempMil = jsonObj.main.temp;
	var iconMil="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlLondra);
	jsonObj = await response.json();
	var tempLon = jsonObj.main.temp;
	var iconLon="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlParigi);
	jsonObj = await response.json();
	var tempPar = jsonObj.main.temp;
	var iconPar="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlNy);
	jsonObj = await response.json();
	var tempNy = jsonObj.main.temp;
	var iconNy="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlLa);
	jsonObj = await response.json();
	var tempLa = jsonObj.main.temp;
	var iconLa="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlSydney);
	jsonObj = await response.json();
	var tempSyd = jsonObj.main.temp;
	var iconSyd="/icons/" + jsonObj.weather[0].icon + ".svg";

	response = await fetch(data.apiUrlTokyo);
	jsonObj = await response.json();
	var tempTk = jsonObj.main.temp;
	var iconTk="icons/" + jsonObj.weather[0].icon + ".svg";

	self.postMessage({
		'tempMilano' : tempMil,
		'iconMil' : iconMil,
		'tempLondra' : tempLon,
		'iconLon' : iconLon,
		'tempParigi' : tempPar,
		'iconPar' : iconPar,
		'tempNy' : tempNy,
		'iconNy' : iconNy,
		'tempLa' : tempLa,
		'iconLa' : iconLa,
		'tempSydney' : tempSyd,
		'iconSyd' : iconSyd,
		'tempTokyo' : tempTk,
		'iconTk' : iconTk,
		'status' : 'OK',
	})
}, false);