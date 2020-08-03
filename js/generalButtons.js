$(document).ready(function(){

    $( "#buttonWeather" ).click(function() {

        $("#mainResultTableBody tr").remove();
        var response = APIcall("https://api.openweathermap.org/data/2.5/weather?id=2661861&appid=3110630bf875a745670e7c443681ebed&units=metric")
        //weatherHead.appendTo('#mainResultTableHead');
        var $tr = $('<tr>').append(
            $('<th scope="row">').text('City:'),
            $('<td>').text(response.data.name),
        ).appendTo('#mainResultTableBody');

        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Timestamp:'),
            $('<td>').text(convertUnixFull(response.data.dt)),
        ).appendTo('#mainResultTableBody');

        var $tr = $('<tr>').append(
            $('<th scope="row" class="align-middle">').text('Weather:'),
            $('<td>').html(`<img id="wicon" src="http://openweathermap.org/img/w/${String(response.data.weather[0].icon)}.png" alt="Weather icon"> ${response.data.weather[0].main} (${response.data.weather[0].description})`),
        ).appendTo('#mainResultTableBody');

        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Temperature:'),
            $('<td>').html(`${response.data.main.temp} <span>&#8451;</span>`),
        ).appendTo('#mainResultTableBody');

        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Humidity:'),
            $('<td>').text(response.data.main.humidity + '%'),
        ).appendTo('#mainResultTableBody');

        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Sunset/Sunrise:'),
            $('<td>').text(convertUnixTime(response.data.sys.sunset) + ' / ' + convertUnixTime(response.data.sys.sunrise)),
        ).appendTo('#mainResultTableBody');
        
    });

    /*
    $( "" ).click(function() {
        $("#mainResultTableBody tr").remove();
        var response = APIcall("")
        console.log(response);
        weatherHead.appendTo('#mainResultTableHead');
        $.each(response.data, function(i, item) {
        var $tr = $('<tr>').append(
            $('<td>').text(item.id),
            $('<td>').text(item.name),
        ).appendTo('#mainResultTableBody');
        });
    });
    */

});