function callTemperatureOverLimitController($scope, $timeout,dataFromServer) {
	$scope.temperatureOverLimit = dataFromServer.temperatureOverLimit;
	console.log($scope.temperatureOverLimit);
}