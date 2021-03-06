$(document).ready(function(){

    $( "#buttonWeather" ).click(function() {
        $("#mainResultTable tr").remove();
        var response = APIcallGET("https://api.openweathermap.org/data/2.5/weather?id=2661861&appid=3110630bf875a745670e7c443681ebed&units=metric")
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
            $('<td>').html(`<img id="wicon" src="http://openweathermap.org/img/w/${response.data.weather[0].icon}.png" alt="Weather icon"> ${response.data.weather[0].main} (${response.data.weather[0].description})`),
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

    $( "#buttonMangdex" ).click(function() {
        $("#mainResultTable tr").remove();
        mangadexHead.appendTo('#mainResultTableHead');
        fetch('https://mangadex.org/rss/sQF2apzwyqSmWcTfVG7MY4nb8P9EtAUZ')
        .then(response => response.text())
        .then(data => {
            var jsonObj = RSStoJSON(data)
            var feed = parseMangadex(jsonObj)
            $.each(feed, function(i, item){
                var $tr = $('<tr>').append(
                    $('<td>').html('<a href="' + item.mangaLink + '" target="_blank"><img src="https://mangadex.org/images/manga/' + item.mangaID + '.thumb.jpg"></a>'),
                    $('<td>').html('<u><h5>' + item.mangaTitle + '</h5></u><a class="btn btn-secondary btn-sm text-light" href="' + item.chapterLink + '" target="_blank">' + item.chapterTitle + '</a>'),
                    $('<td>').text(item.time),
                ).appendTo('#mainResultTableBody');
            });
        });
    });

    $( "#buttonWuxiaworld" ).click(function() {
        $("#mainResultTable tr").remove();
        wuxiaworldHead.appendTo('#mainResultTableHead');
        fetch('https://www.wuxiaworld.com/feed/chapters')
        .then(response => response.text())
        .then(data => {
            var jsonObj = RSStoJSON(data);
            var feed = parseWuxiaworld(jsonObj);
            $.each(feed, function(i, item){
                var $tr = $('<tr>').append(
                    $('<td>').text(item.novelTitle),
                    $('<td>').html('<a class="btn btn-sm btn-secondary text-light" href="' + item.chapterLink + '" target="_blank">' + item.chapterTitle + '</a>'),
                ).appendTo('#mainResultTableBody');
            });
        });
    });

    $( "#buttonTopMovies" ).click(function() {
        $("#mainResultTable tr").remove();
        topMoviesHead.appendTo('#mainResultTableHead');
        var responsePage1 = APIcallGET('https://api.themoviedb.org/3/trending/movie/week?api_key=99dc569b01d5c0a096d15b2dde2633b8')
        var responsePage2 = APIcallGET('https://api.themoviedb.org/3/trending/movie/week?api_key=99dc569b01d5c0a096d15b2dde2633b8&page=2')
        var responseAllPages = []
        responseAllPages.push(responsePage1.data.results, responsePage2.data.results)
        var counter = 1;
        $.each(responseAllPages, function(j, list){
            $.each(list, function(i, item){
                var $tr = $('<tr>').append(
                    $('<td>').text(counter++ + '.'),
                    $('<td>').html('<h5>' + item.title + '</h5>'),
                    $('<td class="p-1 align-middle " style="width:7rem;">').html('<a href="https://www.themoviedb.org/movie/' + item.id + '" target="_blank"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w92' + item.poster_path + '"></a>'),
                    $('<td>').html('<p style="width:38rem;">' + item.overview + '</p>'),
                ).appendTo('#mainResultTableBody');
            });
        });
    });

    $( "#NYtimesMovies" ).click(function() {
        $("#mainResultTable tr").remove();
        nyTimesHead.appendTo('#mainResultTableHead');
        fetch('http://rss.art19.com/the-daily')
        .then(response => response.text())
        .then(data => {
            var jsonObj = RSStoJSON(data);
            //console.log(jsonObj)
            var feed = parseNYtimes(jsonObj);
            var counter = 0;
            $.each(feed, function(i, item){
                    var $tr = $('<tr style="border-bottom: 2px solid var(--primary);">').append(
                            $('<td colspan="2" class="h5">').text(item.title),
                        ).appendTo('#mainResultTableBody');
                        var $tr = $('<tr>').append(
                            $('<td style="width:9rem;">').html('<a class="h5" href="' + item.url + '"><img class="img-thumbnail" src="' + item.cover + '"></a>'),
                            $('<td>').html('<span>' + item.summary + '</span>'),
                    ).appendTo('#mainResultTableBody');
                counter++
            });
        });
    });

});