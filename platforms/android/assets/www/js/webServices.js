var api_server = 'http://192.168.1.100/greenhouse/';
var timeout = 20000;

function rest_fetchHumidities(date) {
    var _url = api_server + 'humidity/get';
    console.log(_url);
    console.log(date);
    return jQuery.ajax({
        type: "GET",
        url: _url,
        data: {date: date},
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        timeout: timeout
    });
}

function rest_fetchTemperatures(date) {
    var _url = api_server + 'temperature/get';
    console.log(_url);
    console.log(date);
    return jQuery.ajax({
        type: "GET",
        url: _url,
        data: {date: date},
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        timeout: timeout
    });
}

function rest_fetchMethane(date) {
    var _url = api_server + 'methane/get';
    console.log(_url);
    console.log(date);
    return jQuery.ajax({
        type: "GET",
        url: _url,
        data: {date: date},
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        timeout: timeout
    });
}

function rest_fetchCarbonMonoxide(date) {
    var _url = api_server + 'carbon_monoxide/get';
    console.log(_url);
    console.log(date);
    return jQuery.ajax({
        type: "GET",
        url: _url,
        data: {date: date},
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        timeout: timeout
    });
}