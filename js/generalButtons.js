$(document).ready(function(){

    $( "#buttonWeather" ).click(function() {

        $("#mainResultTable tr").remove();
        var response = APIcallGET("https://api.openweathermap.org/data/2.5/weather?id=2661861&appid=3110630bf875a745670e7c443681ebed&units=metric")
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

    $( "#buttonJokes" ).click(function() {

        $("#mainResultTable tr").remove();
        var header = {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": "7d5323bd70msh979ace3c125a072p11f7d8jsn678c4a4623f9",
            "accept": "application/json"
        }
        var response = APIcallGET("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", header)
        jokeHead.appendTo('#mainResultTableHead');
        var $tr = $('<tr>').append(
            $('<td>').text(response.data.value),
        ).appendTo('#mainResultTableBody');
        
    });     

    // Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


    $( "#buttonMangdex" ).click(function() {

        fetch('https://mangadex.org/rss/sQF2apzwyqSmWcTfVG7MY4nb8P9EtAUZ')
        .then(response => response.text())
        .then(data => {
            var xmlDoc = new window.DOMParser().parseFromString(data, "text/xml")
            var jsonText = JSON.stringify(xmlToJson(xmlDoc));
            console.log(jsonText);
            var jsonObj = JSON.parse(jsonText)
            console.log(jsonObj);
        });
                       
        /*
        $("#mainResultTable tr").remove();
        jokeHead.appendTo('#mainResultTableHead');

        $.each(response.data.items, function(i, item){
            var $tr = $('<tr>').append(
                $('<td>').text(item.title),
            ).appendTo('#mainResultTableBody');
        });
        */
        
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