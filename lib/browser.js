var FileSelector = require('./fileSelector.js');
var Cropper = require('./cropper.js');

function initialize() {

	// Holds are the croppers
	var croppers = [];

	// Create a file selector
	var file_selector = new FileSelector({
		// File Selector options
		parent_tag: 'file-selector-parent',
		thumbnail_height: 50,
		thumbnail_width: 50,
		min_width: 500,
		min_height: 500	
	});

	// Attach to document
	file_selector.attachToDOM();

	// Create a cropper
	var cropper = new Cropper({
		parent_tag: 'cropper-a',
		canvas_width: 300,
		canvas_height: 300,
		cropper_width: 100,
		cropper_height: 100
	});

	// Attach to document
	cropper.attachToDOM();

	// Add to list of croppers
	croppers.push(cropper);

	// When a new image is selected, trigger drawImage for each registered cropper
	file_selector.on('img-selected', function(data) {
		console.log(data);
		for (var i = 0; i < croppers.length; i++) {
			croppers[i].drawImage(data);
		}
	});
}

initialize();