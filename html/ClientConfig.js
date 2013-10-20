var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		//'./gameClasses/MyCustomClassFile.js',

		/* Standard game scripts */
		'../js/IsogenicMap.js',
		'../js/testMap.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }