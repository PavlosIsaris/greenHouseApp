function callHumidityOverLimitController($scope, $timeout,dataFromServer) {
	$scope.humidityOverLimit = dataFromServer.humidityOverLimit;
	console.log($scope.humidityOverLimit);
}