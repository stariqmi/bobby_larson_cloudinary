app.directive('fileSelector', function() {
	return {
		templateUrl: '/src/templates/fileSelector.html',
		retrict: 'E',
		scope: {
			'url': '='
		},
		link: function(scope, element, attrs) {

			var file_input = element.find('input');
			file_input.unsigned_cloudinary_upload("zcudy0uz", { cloud_name: 'demo', tags: 'browser_uploads' });
			file_input.on('cloudinarydone', function() {
				var regex = new RegExp('^image(.)*$');
				if (this.files.length > 0 && regex.test(this.files[0].type)) {
					
					var reader = new FileReader();

					reader.onload = function(e) {
						var url = reader.result;

						var img = new Image();
						img.src = url;

						var width = img.width;
						var height = img.height;

						// If selected image is has valid dimensions as specified by the attrs
						if (width <= attrs.maxWidth && height <= attrs.maxHeight) {
							
							scope.$apply(function() {
								scope.url = url;
							});

							var thumbnail = element.find('img');
							thumbnail.attr('src', url);
							thumbnail.css('width', attrs.thumbnailWidth);
							thumbnail.css('height', attrs.thumbnailHeight);
						} else {
							console.log('Image size is too big');
						}

						// Remove object reference to delete Immage object
						img = null;
					};

					reader.readAsDataURL(this.files[0]);
				}
			})
		}
	};
});