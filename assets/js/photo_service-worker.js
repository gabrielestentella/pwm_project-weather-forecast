self.addEventListener('message', async function(e){
	let data = e.data;

	var clientID = 'Yme6ZcumIXpWryQ0DPc249CE0ua2Mxh66Y-4W2gPAAc';
	var endpoint = `https://api.unsplash.com/search/photos?page=1&query=${data.userLocation}&client_id=${clientID}`;
	var photoUrl;
	await fetch(endpoint)
	.then(async response => {
		jsonObj = await response.json();
		console.log(jsonObj);
		if (jsonObj.total) {
			photoUrl = jsonObj.results[0].urls.thumb;
		} else {
			await fetch(`https://api.unsplash.com/search/photos?page=1&query=${data.weatherDescription}&client_id=${clientID}`)
			.then(async response => {
			jsonObj = await response.json();
			console.log(jsonObj);
			photoUrl = jsonObj.results[0].urls.thumb;
			})
		}
	})

	self.postMessage({
		'url' : photoUrl,
	})

}, false);