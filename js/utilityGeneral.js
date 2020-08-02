$(document).ready(function(){

    function APIcall(url){
        $.ajax({
            url: url,
            async: false,
            crossDomain: true,
            complete: function(response){
                data = response.responseJSON;
                statusCode = response.status;
                statusText = response.statusText;
            }
        });
        var APIcallResponse = {'data': data, 'status': {'code': statusCode, 'text': statusText}};
        //console.log(APIcallResponse);
        return APIcallResponse;
    }

    function addZero(digit){
        digit = String(digit);
        if (digit.length <= 1){
            digit = '0' + digit;
            }
        return digit
    }

    $( "#buttonWeather" ).click(function() {

        $("#mainResultTableBody tr").remove();
        var response = APIcall("https://api.openweathermap.org/data/2.5/weather?id=2661861&appid=3110630bf875a745670e7c443681ebed&units=metric")
        //weatherHead.appendTo('#mainResultTableHead');
        var timestamp = new Date(response.data.dt * 1000);
        timestamp = addZero(timestamp.getDate()) + '.' + addZero(timestamp.getMonth()) + '.' + timestamp.getFullYear() + ' ' + addZero(timestamp.getHours() + ':' + addZero(timestamp.getMinutes()));
        var $tr = $('<tr>').append(
            $('<th scope="row">').text('City:'),
            $('<td>').text(response.data.name),
        ).appendTo('#mainResultTableBody');
        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Temperature:'),
            $('<td>').html(`${response.data.main.temp} <span>&#8451;</span>`),
        ).appendTo('#mainResultTableBody');
        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Timestamp:'),
            $('<td>').text(timestamp),
        ).appendTo('#mainResultTableBody');
        var $tr = $('<tr>').append(
            $('<th scope="row">').text('Humidity:'),
            $('<td>').text(response.data.main.humidity + '%'),
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