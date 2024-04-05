export const imageMapper = (imageObj, glassware) => {
	/**
	 *
	 * {
	 * APC:APC,
	 * wineglass:wineglass
	 * }
	 */
	let image;

	switch (glassware) {
		case "coupe":
			image = imageObj.coupe;
			break;
		case "flute":
			image = imageObj.flute;
			break;
		case "rocks glass":
			image = imageObj.rocks;
			break;
		case "rocks":
			image = imageObj.rocks;
			break;
		case "collins":
			image = imageObj.collins;
			break;
		case "Wine glass":
			image = imageObj.wineGlass;
			break;
		case "tulip":
			image = imageObj.tikiMug;
			break;

		default:
			image = imageObj.coupe;
			break;
	}
	// console.log(image, "image from imageMapper");
	return image;
};
