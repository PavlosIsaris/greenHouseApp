function callHumidityController($scope, $timeout,dataFromServer) {
	$scope.init = function() {
	        /*if (document.getElementById("humidityChart")) {
			  //console.log('this record already exists');

			} else {
			  console.log("not here");
			}*/
			$(".loaderContainerWelcome").css("z-index","5");
			$(".loaderWelcome").css("z-index","6");
			$(".loaderContainerWelcome").css("display","block");
			$(".loaderWelcome").css("display","block");
			console.log($scope.getYesterDay());
			var date = $scope.getYesterDay();
			rest_fetchHumidities(date).success(function (data) {
				console.log(data);
				if(data.length > 0) {
					var currSlave = data[0].slave_name;
					var dataSetS1 = [];
					var dataSetS2 = [];
					var hourSetS1 = [];
					var hourSetS2 = [];
					for(var i = 0; i < data.length; i++) {
						if(data[i].slave_name == "s1") {
							dataSetS1.push(data[i].humidity);
							hourSetS1.push(data[i].added_on);
						} else if(data[i].slave_name == "s2") {
							dataSetS2.push(data[i].humidity);
							hourSetS2.push(data[i].added_on);
						}
					}
					//console.log(dataSetS1);
					var bigArr = hourSetS1.concat(hourSetS2);
					var uniqueHours = [];
					$.each(bigArr, function(i, el){
					    if($.inArray(el, uniqueHours) === -1) uniqueHours.push(el);
					});
					uniqueHours.sort(function(a,b){return a - b});
					console.log(uniqueHours);
					var dataToDraw = {
					    labels: uniqueHours,
					    datasets: [
					        {
					            label: "Sensor 1",
					            fillColor: "rgba(220,220,220,0.2)",
					            strokeColor: "rgba(220,220,220,1)",
					            pointColor: "rgba(220,220,220,1)",
					            pointStrokeColor: "#fff",
					            pointHighlightFill: "#fff",
					            pointHighlightStroke: "rgba(220,220,220,1)",
					            data: dataSetS1
					        },
					        {
					            label: "Sensor 2",
					            fillColor: "rgba(151,187,205,0.2)",
					            strokeColor: "rgba(151,187,205,1)",
					            pointColor: "rgba(151,187,205,1)",
					            pointStrokeColor: "#fff",
					            pointHighlightFill: "#fff",
					            pointHighlightStroke: "rgba(151,187,205,1)",
					            data: dataSetS2
					        }
					    ]
					};
					var options = {
						    scaleShowGridLines : true,
						    scaleGridLineColor : "rgba(0,0,0,.05)",
						    scaleGridLineWidth : 1,
						    scaleShowHorizontalLines: true,
						    scaleShowVerticalLines: true,
						 
						    pointDot : true,
						    pointDotRadius : 6,
						    pointDotStrokeWidth : 2,
						    pointHitDetectionRadius : 20,
						    scaleBeginAtZero : false,

						    barShowStroke : true,

						    //Number - Pixel width of the bar stroke
						    barStrokeWidth : 2,

						    //Number - Spacing between each of the X value sets
						    barValueSpacing : 5,

						    //Number - Spacing between data sets within X values
						    barDatasetSpacing : 1,

							scaleOverride:true,
							scaleStartValue:0,
							scaleStepWidth:5,
							scaleSteps: 25,
						    datasetFill : true,
						    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
						    //String - A legend template
						    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
					};
					$(".explanation").remove();
					$(".yAxis").css("visibility","visible");
					$scope.createBarChart(dataToDraw, options, "humidityChart", "humidityLegend");
				} else {
						$(".yAxis").css("visibility","hidden");
						$(".explanation").remove();
	    				$("#humidityChart").empty();
	    				$("#humidityLegend").empty();	
						if(dataFromServer.myLineChart != undefined) {
			    			//console.log("not undefined");
			    			dataFromServer.myLineChart.destroy();
			    		}
						$("#humidityChart").after('<div class="explanation">No data for ' + date +'</div>');
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
			$("#datepicker").hide();
			$scope.pickDate = function() {
				//console.log("pick");
				$("#datepicker").toggle();
				
			};
			$( "#datepicker" ).datepicker({
				dateFormat: 'yy-mm-dd',
				onSelect: function(dateText, inst) { 
					var date = dateText; //the first parameter of this function
					var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
					$(".loaderContainerWelcome").css("z-index","5");
					$(".loaderWelcome").css("z-index","6");
					$(".loaderContainerWelcome").css("display","block");
					$(".loaderWelcome").css("display","block");
					rest_fetchHumidities(date).success(function (data) {
						console.log(data);
						if(data.length > 0) {
							var currSlave = data[0].slave_name;
							var dataSetS1 = [];
							var dataSetS2 = [];
							var hourSetS1 = [];
							var hourSetS2 = [];
							for(var i = 0; i < data.length; i++) {
								if(data[i].slave_name == "s1") {
									dataSetS1.push(data[i].humidity);
									hourSetS1.push(data[i].added_on);
								} else if(data[i].slave_name == "s2") {
									dataSetS2.push(data[i].humidity);
									hourSetS2.push(data[i].added_on);
								}
							}
							//console.log(dataSetS1);
							var bigArr = hourSetS1.concat(hourSetS2);
							var uniqueHours = [];
							$.each(bigArr, function(i, el){
							    if($.inArray(el, uniqueHours) === -1) uniqueHours.push(el);
							});
							uniqueHours.sort(function(a,b){return a - b});
							console.log(uniqueHours);
							var dataToDraw = {
							    labels: uniqueHours,
							    datasets: [
							        {
							            label: "Sensor 1",
							            fillColor: "rgba(220,220,220,0.2)",
							            strokeColor: "rgba(220,220,220,1)",
							            pointColor: "rgba(220,220,220,1)",
							            pointStrokeColor: "#fff",
							            pointHighlightFill: "#fff",
							            pointHighlightStroke: "rgba(220,220,220,1)",
							            data: dataSetS1
							        },
							        {
							            label: "Sensor 2",
							            fillColor: "rgba(151,187,205,0.2)",
							            strokeColor: "rgba(151,187,205,1)",
							            pointColor: "rgba(151,187,205,1)",
							            pointStrokeColor: "#fff",
							            pointHighlightFill: "#fff",
							            pointHighlightStroke: "rgba(151,187,205,1)",
							            data: dataSetS2
							        }
							    ]
							};
							var options = {
								    scaleShowGridLines : true,
								    scaleGridLineColor : "rgba(0,0,0,.05)",
								    scaleGridLineWidth : 1,
								    scaleShowHorizontalLines: true,
								    scaleShowVerticalLines: true,
								 
								    pointDot : true,
								    pointDotRadius : 6,
								    pointDotStrokeWidth : 2,
								    pointHitDetectionRadius : 20,

								    barShowStroke : true,

								    //Number - Pixel width of the bar stroke
								    barStrokeWidth : 2,
								    scaleBeginAtZero : false,
								    //Number - Spacing between each of the X value sets
								    barValueSpacing : 5,

								    //Number - Spacing between data sets within X values
								    barDatasetSpacing : 1,

									scaleOverride:true,
									scaleStartValue:0,
									scaleStepWidth:5,
									scaleSteps: 25,
								    datasetFill : true,
								    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
								    //String - A legend template
								    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
							};
							$(".explanation").remove();
							$(".yAxis").css("visibility","visible");	
							console.log(dataToDraw);
							$scope.createBarChart(dataToDraw, options, "humidityChart", "humidityLegend");
						} else {
							$(".yAxis").css("visibility","hidden");
							$(".explanation").remove();
		    				$("#humidityChart").empty();
		    				$("#humidityLegend").empty();	
							if(dataFromServer.myLineChart != undefined) {
				    			//console.log("not undefined");
				    			dataFromServer.myLineChart.destroy();
				    		}
							$("#humidityChart").after('<div class="explanation">No data for ' + date +'</div>');
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
					$("#datepicker").hide();
				}
			});
	    };
		
}