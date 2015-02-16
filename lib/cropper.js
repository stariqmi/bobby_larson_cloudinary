var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

module.exports = Cropper;

function Cropper(opts) {
	this.parent_tag = opts.parent_tag;

	// Canvas dimensions
	this.canvas_width = opts.canvas_width;
	this.canvas_height = opts.canvas_height;

	// Cropper dimensions
	this.cropper_width = opts.cropper_width;
	this.cropper_height = opts.cropper_height;
}

inherits(Cropper, EventEmitter);

Cropper.prototype.attachToDOM = function() {
	var parent = document.getElementById(this.parent_tag);
	parent.style.width = this.canvas_width + 'px';
	parent.style.height = this.canvas_height + 'px';

	// Create child canvas element
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', this.canvas_width);
	canvas.setAttribute('height', this.canvas_height);
	canvas.setAttribute('class', 'cropper-canvas');

	parent.appendChild(canvas);
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	// Append cropper div
	var cropper = document.createElement('div');
	cropper.style.width = this.cropper_width + 'px';
	cropper.style.height = this.cropper_height + 'px';
	cropper.setAttribute('class', 'cropper-el');
	parent.appendChild(cropper);

	// Set cropper as draggable
	$(cropper).draggable({
		containment: 'parent'
	})
	.on('dragstop', function(event, ui) {
		var start_x = ui.offset.left - $(canvas).offset().left;
		var start_y = ui.offset.top - $(canvas).offset().top;
		console.log(start_x + ' , ' + start_y);
	});


};

Cropper.prototype.drawImage = function(data) {
	console.log('Drawing image on canvas: ' + data.url);
	var ctx = this.context;
	var img = new Image();
	img.src = data.url;

	// Need to set size before
	this.canvas.setAttribute('width', data.width);
	this.canvas.setAttribute('height', data.height);

	var parent = document.getElementById(this.parent_tag);
	parent.style.width = data.width + 'px';
	parent.style.height = data.height + 'px';

	ctx.drawImage(img, 0, 0);
};