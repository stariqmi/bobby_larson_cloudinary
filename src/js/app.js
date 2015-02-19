var app = angular.module('app', []);

app.controller('MainCtrl', function MainCtrl($scope) {
	$scope.url = '';
	$scope.croppers = {};

	$scope.$on('register-cropper', function(event, id) {
		$scope.croppers[id] = {};
	});

	$scope.$on('cropped',function(event, data) {
		$scope.croppers[data.id] = data;
	});

	$scope.submit = function() {
		console.log($scope.croppers);
	};
});