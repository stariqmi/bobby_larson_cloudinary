var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter; 

module.exports = FileSelector;

function FileSelector(opts) {
	this.parent_tag = opts.parent_tag;
	this.thumb_height = opts.thumbnail_height;
	this.thumb_width = opts.thumbnail_width;

	this.min_width = opts.min_width;
	this.min_height = opts.min_height;
}

inherits(FileSelector, EventEmitter);

FileSelector.prototype.attachToDOM = function() {
	var that = this;
	
	// Get parent tag
	var parent = document.getElementById(this.parent_tag);
	
	// Template for file selector
	var template = '<input type="file" id="file-selector" /> <br/> <img id="selected-thumbnail" />';
	parent.innerHTML = template; 
	
	// Select inner file input
	var selector = parent.querySelector('#file-selector');

	// Add event listener when file gets selected
	selector.addEventListener('change', function() {
		var file_list = this.files;
		
		// If there is a file
		if (file_list.length !== 0) {
			// Create a new FileReader to read the file
			var reader = new FileReader();
			

			// When the file gets loaded successfully
			reader.onload = function(e) {
				var url = reader.result;
				var img = new Image();
				img.src = url;

				var width = img.width;
				var height = img.height;

				if (width <= that.min_width && height <= that.min_height) {

					// emit url-selected with url
					that.emit('img-selected', {
						url: url,
						width: width,
						height: height
					});

					this.url = url;
					// console.log(url);
					thumbnail = parent.querySelector('#selected-thumbnail')
					thumbnail.setAttribute('src', url);
					thumbnail.setAttribute('width', that.thumb_width);
					thumbnail.setAttribute('height', that.thumb_height);
				} else {
					console.log('Image size too big');
					alert('Image size too big');
				}

				// Destroy image object
				img = null;
			};

			// Read file
			reader.readAsDataURL(file_list[0]);
		}
	});
};