var request = require("request");
var Transformator = require("./transformator");

// fetch style url
request(process.argv[2], (error, response, body) => {
	if (!error && response.statusCode == 200) {

		var style = JSON.parse(body);
		if(!style.layers) console.error("Unable to parse Mapbox GL style JSON")

		var path = {};

		// loop every layer in the style and ...
		style.layers.forEach(layer => {

			// ... translate to leaflet path styles
			var leafletObj = {};
			Object.keys(layer.paint).forEach(key => {
				var value = layer.paint[key];

				var leafletKey;
				var leafletValue = value;
				var transform = new Transformator(value);

				switch(key) {
					case "fill-color":
						leafletKey = "fillColor";
						leafletValue = transform.Color(value);
						break;

					case "fill-opacity":
						leafletKey = "fillOpacity";
						leafletValue = transform.Opacity(value);
						break;

					case "line-color":
						leafletKey = "color";
						leafletValue = transform.Color(value);
						break;

					case "line-dasharray":
						leafletKey = "dashArray";
						break;

					case "line-width":
						leafletKey = "weight";
						leafletValue = transform.Opacity(value);
						break;

					case "line-opacity":
						leafletKey = "opacity";
						leafletValue = transform.Opacity(value);
						break;

					case "line-offset":
						leafletKey = "dashOffset";
						break;
				}

				if(leafletKey) {
					leafletObj[leafletKey] = leafletValue;
				}
			});

			// add style to path styles
			if(Object.keys(leafletObj).length !== 0) {
				path[layer.id] = leafletObj;
			}
		});

		console.log(path);
	}
	else {
		console.error(error || "Unable to download Mapbox GL style JSON file");
	}
});
