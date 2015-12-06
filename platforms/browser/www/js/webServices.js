var api_server = 'http://localhost/greenhouse/';
var timeout = 20000;

function rest_fetchHumidities(date) {
    var _url = api_server + 'humidity/get';
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
    return jQuery.ajax({
        type: "GET",
        url: _url,
        data: {date: date},
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        timeout: timeout
    });
}