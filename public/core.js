// public/core.js
var scotchPuntuacion = angular.module('scotchPuntuacion', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all puntuaciones and show them
	$http.get('/api/puntuaciones')
		.success(function(data) {
			$scope.puntuaciones = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createPuntuacion = function() {
		$http.post('/api/puntuaciones', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.puntuaciones = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a puntuacion after checking it
	$scope.deletePuntuacion = function(id) {
		$http.delete('/api/puntuaciones/' + id)
			.success(function(data) {
				$scope.puntuaciones = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}