function callMethaneController($scope, $timeout,dataFromServer) {

	$scope.init = function() {
		$(".loaderContainerWelcome").css("z-index","5");
		$(".loaderWelcome").css("z-index","6");
		$(".loaderContainerWelcome").css("display","block");
		$(".loaderWelcome").css("display","block");
		//console.log($scope.getYesterDay());
		var date = $scope.getToday();
		rest_fetchMethane(date).success(function (data) {
			//console.log(data);
			if(data.length > 0) {
				var dataSet = [];
				var hourSet = [];
				for(var i = 0; i < data.length; i++) {
					dataSet.push(data[i].methane_value);
					hourSet.push(data[i].added_on);
				}
				hourSet.sort(function(a,b){return a - b});
				console.log(hourSet);
				console.log(dataSet);
				var dataToDraw = {
				    labels: hourSet,
				    datasets: [
				        {
				            label: "Methane Sensor ",
				            fillColor: "rgba(220,220,220,0.2)",
				            strokeColor: "rgba(220,220,220,1)",
				            pointColor: "rgba(220,220,220,1)",
				            pointStrokeColor: "#fff",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "rgba(220,220,220,1)",
				            data: dataSet
				        }
				    ]
				};
				var options = {
						    scaleShowGridLines : true,
						    scaleGridLineColor : "rgba(0,0,0,.05)",
						    scaleGridLineWidth : 1,
						    scaleShowHorizontalLines: true,
						    scaleShowVerticalLines: true,
						    bezierCurve : true,
						    bezierCurveTension : 0.4,
						    pointDot : true,
						    pointDotRadius : 6,
						    pointDotStrokeWidth : 2,
						    pointHitDetectionRadius : 20,
						    datasetStroke : true,
						    datasetStrokeWidth : 2,

							scaleOverride:true,
							scaleStartValue:0,
							scaleStepWidth:100,
							scaleSteps: 10,
						    datasetFill : true,
						    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
						    //String - A legend template
						    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				};
				$(".explanation").remove();
				$(".yAxis").css("visibility","visible");
				$scope.createChart(dataToDraw, options, "methaneChart", "methaneLegend");
			} else {
				$(".yAxis").css("visibility","hidden");
				$(".explanation").remove();
	    		$("#methaneChart").empty();
	    		$("#methaneLegend").empty();
				if(dataFromServer.myLineChart != undefined) {
	    			//console.log("not undefined");
	    			dataFromServer.myLineChart.destroy();
	    		}	
				$("#methaneChart").after('<div class="explanation">No data for ' + date +'</div>')
			}
			$(".loaderContainerWelcome").css("z-index", "-1");
			$(".loaderWelcome").css("z-index", "-1");
			$(".loaderContainerWelcome").css("display", "none");
			$(".loaderWelcome").css("display", "none");

			}).error(function (jqXhr, textStatus, errorThrown) {
					console.log(jqXhr.error);
					console.log(textStatus);
					console.log(errorThrown);
					$(".loaderContainerWelcome").css("z-index", "-1");
					$(".loaderWelcome").css("z-index", "-1");
					$(".loaderContainerWelcome").css("display", "none");
					$(".loaderWelcome").css("display", "none");
			});
		$("#datepickerMethane").hide();
		$scope.pickDate = function() {
			//console.log("pick");
			$("#datepickerMethane").toggle();
			
		};
		$( "#datepickerMethane" ).datepicker({
			dateFormat: 'yy-mm-dd',
			onSelect: function(dateText, inst) { 
				var dateAsString = dateText; //the first parameter of this function
				var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
				$(".loaderContainerWelcome").css("z-index","5");
				$(".loaderWelcome").css("z-index","6");
				$(".loaderContainerWelcome").css("display","block");
				$(".loaderWelcome").css("display","block");
				rest_fetchMethane(dateAsString).success(function (data) {
					console.log(data);
					if(data.length > 0) {
						var dataSet = [];
						var hourSet = [];
						for(var i = 0; i < data.length; i++) {
							dataSet.push(data[i].methane_value);
							hourSet.push(data[i].added_on);
						}
						hourSet.sort(function(a,b){return a - b});
						console.log(hourSet);
						var dataToDraw = {
						    labels: hourSet,
						    datasets: [
						        {
						            label: "Methane Sensor ",
						            fillColor: "rgba(220,220,220,0.2)",
						            strokeColor: "rgba(220,220,220,1)",
						            pointColor: "rgba(220,220,220,1)",
						            pointStrokeColor: "#fff",
						            pointHighlightFill: "#fff",
						            pointHighlightStroke: "rgba(220,220,220,1)",
						            data: dataSet
						        }
						    ]
						};
						var options = {
						    scaleShowGridLines : true,
						    scaleGridLineColor : "rgba(0,0,0,.05)",
						    scaleGridLineWidth : 1,
						    scaleShowHorizontalLines: true,
						    scaleShowVerticalLines: true,
						    bezierCurve : true,
						    bezierCurveTension : 0.4,
						    pointDot : true,
						    pointDotRadius : 6,
						    pointDotStrokeWidth : 2,
						    pointHitDetectionRadius : 20,
						    datasetStroke : true,
						    datasetStrokeWidth : 2,

							scaleOverride:true,
							scaleStartValue:0,
							scaleStepWidth:100,
							scaleSteps: 10,
						    datasetFill : true,
						    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
						    //String - A legend template
						    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
						};
						$(".explanation").remove();
						$(".yAxis").css("visibility","visible");
						$scope.createChart(dataToDraw, options, "methaneChart", "methaneLegend");
					} else {
						$(".yAxis").css("visibility","hidden");
						$(".explanation").remove();
	    				$("#methaneChart").empty();
	    				$("#methaneLegend").empty();	
						if(dataFromServer.myLineChart != undefined) {
			    			//console.log("not undefined");
			    			dataFromServer.myLineChart.destroy();
			    		}
						$("#methaneChart").after('<div class="explanation">No data for ' + date +'</div>')
					}
					$(".loaderContainerWelcome").css("z-index", "-1");
					$(".loaderWelcome").css("z-index", "-1");
					$(".loaderContainerWelcome").css("display", "none");
					$(".loaderWelcome").css("display", "none");

				}).error(function (jqXhr, textStatus, errorThrown) {
					console.log(jqXhr.error);
					console.log(textStatus);
					console.log(errorThrown);
					$(".loaderContainerWelcome").css("z-index", "-1");
					$(".loaderWelcome").css("z-index", "-1");
					$(".loaderContainerWelcome").css("display", "none");
					$(".loaderWelcome").css("display", "none");
				});
				//console.log(dateAsString);
				$("#datepickerMethane").hide();
			}
		});
    };

}