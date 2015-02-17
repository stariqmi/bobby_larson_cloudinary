app.directive('cropper', function() {
	return {
		templateUrl: '/src/templates/cropper.html',
		restrict: 'E',
		scope: {
			'url': '='
		},
		link: function(scope, element, attrs) {
			var img;

			// Set wrapper div's dimensions
			var parent = element.find('.cropper-container');
			parent.attr('id', attrs.id);
			parent.css('width', attrs.canvasWidth);
			parent.css('height', attrs.canvasHeight);

			// Set cropper dimensions
			var cropper = parent.find('div');
			cropper.css('width', attrs.cropperWidth);
			cropper.css('height', attrs.cropperHeight);

			// Set canvas dimensions
			var canvas = parent.find('canvas');
			canvas.attr('width', attrs.canvasWidth);
			canvas.attr('height', attrs.canvasHeight);

			// Set the cropper as draggable
			cropper.draggable({ containment: 'parent' });	
			cropper.on('dragstop', function(event, ui) {
				var start_x = ui.offset.left - canvas.offset().left;
				var start_y = ui.offset.top - canvas.offset().top;
				console.log(start_x + ' , ' + start_y);
			});

			// Watch url change
			scope.$watch('url', function(new_url, old_url) {
				if (new_url !== '') {
					img = null;
					img = new Image();
					img.src = new_url;

					// Reset parent dimensions
					parent.css('width', img.width);
					parent.css('height', img.height);

					// Set canvas dimensions
					canvas.attr('width', img.width);
					canvas.attr('height', img.height);
					var ctx = canvas[0].getContext('2d');
					ctx.drawImage(img, 0, 0);
				}
			});
		}
	};
});