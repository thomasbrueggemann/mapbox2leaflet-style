var hsl = require("hsl-to-hex");

class Transformator {

	// CONSTRUCTOR
	constructor(input) {
		this.value = input;
	}

	// PREPARE COLOR
	Color() {

		// is hsl color
		if(this.value.indexOf("hsl") >= 0) {
			var tmp = this.value;

			tmp = tmp.replace("hsl(", "");
			tmp = tmp.replace("hsla(", "");
			tmp = tmp.replace(")", "");

			var values = tmp.split(",");

			var hue = parseInt(values[0]);
			var saturation = parseInt(values[1].replace("%", ""));
			var luminosity = parseInt(values[2].replace("%", ""));

			return hsl(hue, saturation, luminosity);
		}

		// is rgb color
		if(this.value.indexOf("rgb") >= 0) {

			var tmp = this.value;

			tmp = tmp.replace("rgb(", "");
			tmp = tmp.replace("rgba(", "");
			tmp = tmp.replace(")", "");

			var values = tmp.split(",");

			var red = parseInt(values[0]);
			var green = parseInt(values[1]);
			var blue = parseInt(values[2]);

			return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).substr(1);
		}

		return this.value;
	}

	// OPACITY
	Opacity() {

		// if value is object and has base property, use that
		if(typeof this.value === "object" && this.value.base) {
			return this.value.base;
		}

		return this.value;
	}
}

module.exports = Transformator;
