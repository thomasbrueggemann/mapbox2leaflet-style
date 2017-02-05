#!/usr/bin/env node

"use strict";

var request = require("request");

// fetch style url
request(process.argv[2], (error, response, body) => {
	if (!error && response.statusCode == 200) {

		var style = JSON.parse(body);
		if(!style.layers) console.error("Unable to parse Mapbox GL style JSON")

					var distinct = [];
		// loop every layer in the style and ...
		style.layers.map(layer => {


			Object.keys(layer.paint).map(key => {
				var value = layer.paint[key];
				//console.log(key);

				if(distinct.indexOf(key) === -1) distinct.push(key);
			});


			// ... translate to leaflet path styles
			/*var path = {};
			path[layer.id] = layer.paint.map(item => {
				console.log(item);
			});*/
		});

					console.log(distinct);
	}
	else {
		console.error(error || "Unable to download Mapbox GL style JSON file");
	}
});
