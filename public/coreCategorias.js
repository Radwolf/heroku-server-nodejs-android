// public/coreCategorias.js
var scotchCategoria = angular.module('scotchCategoria', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all categorias and show them
	$http.getCategorias('/api/cuentas/categorias')
		.success(function(data) {
			$scope.categorias = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createCategoria = function() {
		$http.post('/api/cuentas/categorias', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.categorias = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a categoria after checking it
	$scope.deleteCategoria = function(id) {
		$http.delete('/api/cuentas/categoria/' + id)
			.success(function(data) {
				$scope.categorias = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}