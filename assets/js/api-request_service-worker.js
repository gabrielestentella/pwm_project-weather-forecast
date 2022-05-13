self.addEventListener('message', async function(e){
	let data = e.data;
	const response = await fetch(data.apiURL);
	var jsonObj = await response.json();
	var iconMil="icons/" + jsonObj.weather[0].icon + ".svg";
	self.postMessage({
		'result' : jsonObj.main.temp,
		'iconMilano' : iconMil,
		'status' : 'OK',
	})
}, false);