(function () {

	var module = angular.module('app', ['onsen']);
	var dataFromServer = {};
	dataFromServer.selectedDateHumidity = "";

	module.controller('AppController', function ($scope, $timeout) {

		$scope.openMenu = function (m) {
                m.toggleMenu();
                m.setSwipeable(true);
                m.on('postclose', function (event) {
                    m.setSwipeable(true);
                });
        };

        $scope.getToday = function() {
        	var yesterday = new Date();
		    var dd = yesterday.getDate();
		    var mm = yesterday.getMonth()+1; //January is 0!

		    var yyyy = yesterday.getFullYear();
		    if(dd<10){
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 
		    var yesterday = yyyy+'-'+mm+'-'+dd;
		    return yesterday;
        };

        $scope.createChart = function(chartData, chartOptions, chartId, legendId) {
	    	//console.log(chartData);
	    	$("#" + chartId).empty();
	    	$("#" + legendId).empty();
	    	if(dataFromServer.myLineChart != undefined) {
	    		//console.log("not undefined");
	    		dataFromServer.myLineChart.destroy();
	    	}
	    	
	    	var ctx = document.getElementById(chartId).getContext("2d");
			dataFromServer.myLineChart = new Chart(ctx).Line(chartData, chartOptions);
			//then you just need to generate the legend
			var legendHolder = document.createElement('div');
			legendHolder.innerHTML = dataFromServer.myLineChart.generateLegend();

			document.getElementById(legendId).appendChild(legendHolder.firstChild);
	    };

	    $scope.createBarChart = function(chartData, chartOptions, chartId, legendId) {
	    	console.log(chartData);
	    	$("#" + chartId).empty();
	    	$("#" + legendId).empty();
	    	if(dataFromServer.myBarChart != undefined) {
	    		//console.log("not undefined");
	    		dataFromServer.myBarChart.destroy();
	    	}
	    	
	    	var ctx = document.getElementById(chartId).getContext("2d");
			dataFromServer.myBarChart = new Chart(ctx).Bar(chartData, chartOptions);
			//then you just need to generate the legend
			var legendHolder = document.createElement('div');
			legendHolder.innerHTML = dataFromServer.myBarChart.generateLegend();

			document.getElementById(legendId).appendChild(legendHolder.firstChild);
	    };

	    dataFromServer.humidityOverLimit = [];
	    rest_fetchHumidityOverLimit().success(function (data) {
	    	$scope.humidityOverLimitNum = data.length;
	    	dataFromServer.humidityOverLimit = data;
	    	console.log($scope.humidityOverLimitNum);
	    	$scope.$apply();

    	}).error(function (jqXhr, textStatus, errorThrown) {
				console.log(jqXhr.error);
				console.log(textStatus);
				console.log(errorThrown);
				
		});

		dataFromServer.temperatureOverLimit = [];
	    rest_fetchTemperatureOverLimit().success(function (data) {
	    	$scope.temperatureOverLimitNum = data.length;
	    	dataFromServer.temperatureOverLimit = data;
	    	$scope.$apply();

    	}).error(function (jqXhr, textStatus, errorThrown) {
				console.log(jqXhr.error);
				console.log(textStatus);
				console.log(errorThrown);
				
		});

	});

	module.controller('HumidityController', function ($scope, $timeout) {
		callHumidityController($scope, $timeout, dataFromServer);
	});

	module.controller('TemperatureController', function ($scope, $timeout) {
        callTemperatureController($scope, $timeout, dataFromServer);
    });

    module.controller('MethaneController', function ($scope, $timeout) {
        callMethaneController($scope, $timeout, dataFromServer);
    });

    module.controller('CarbonMonoxideController', function ($scope, $timeout) {
        callCarbonMonoxideController($scope, $timeout, dataFromServer);
    });

    module.controller('HumidityOverLimitController', function ($scope, $timeout) {
        callHumidityOverLimitController($scope, $timeout, dataFromServer);
    });

    module.controller('TemperatureOverLimitController', function ($scope, $timeout) {
        callTemperatureOverLimitController($scope, $timeout, dataFromServer);
    });

}());