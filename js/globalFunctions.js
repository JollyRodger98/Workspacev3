/*
**********************************************************
*                                                        *
*   All Functions and code used across multiple sites.   *
*                                                        *
**********************************************************
*/


// Default API call
function APIcallGET(url, headers=null){
    $.ajax({
        url: url,
        async: false,
        crossDomain: true,
        method: 'GET',
        headers: headers,
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


// add a zero to single digit integers
function addZero(digit){
    digit = String(digit);
    if (digit.length <= 1){
        digit = '0' + digit;
        }
    return digit
}


// convert unix timestamp to dd.MM.YYYY hh:mm
function convertUnixFull(unixTime){
    var normalTime = new Date(unixTime * 1000);
    normalTime = addZero(normalTime.getHours()) + ':' + addZero(normalTime.getMinutes()) + ' ' + addZero(normalTime.getDate()) + '-' + addZero(normalTime.getMonth()) + '-' + normalTime.getFullYear();
    return normalTime
}


// convert unix timestamp to hh:mm
function convertUnixTime(unixTime){
    var normalTime = new Date(unixTime * 1000);
    normalTime = addZero(normalTime.getHours()) + ':' + addZero(normalTime.getMinutes());
    return normalTime
}


// Changes XML to JSON, copied from https://davidwalsh.name/convert-xml-json
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


// converts output from fetch RSS feed to JSON object
function RSStoJSON(data){
    var xmlDoc = new window.DOMParser().parseFromString(data, "text/xml")
    var jsonObj = JSON.parse(JSON.stringify(xmlToJson(xmlDoc)));
    jsonObj = jsonObj.rss.channel.item
    return jsonObj
}


// parse the Mangdex RSS feed JSON object to custom JSON
function parseMangadex(feed){
    var newFeed = [];
    $.each(feed, function(i, item){
        var pubDate = item.pubDate['#text'].match(/\d\d:\d\d:\d\d/)[0];
        pubDate = pubDate.split(':')
        pubDate.pop()
        pubDate[0] = parseInt(pubDate[0]) + 2;
        pubDate = pubDate.join(':');

        var entry = {
            'chapterTitle': item.title["#text"],
            'mangaTitle': item.title['#text'].split(/ - /)[0],
            'mangaLink': item.mangaLink["#text"],
            'chapterLink': item.guid["#text"],
            'date': item.pubDate['#text'],
            'time': pubDate,
            'mangaID': item.mangaLink['#text'].split('/')[4],
        }

        newFeed.push(entry);
    });
    return newFeed
}


// parse the Wuxiaworld RSS feed JSON object to custom JSON
function parseWuxiaworld(feed){
    var newFeed = [];
    $.each(feed, function(i, item){
        var entry = {
            'novelTitle': item.category["#text"],
            'chapterLink': item.guid["#text"],
            'chapterTitle': item.title["#text"].split(/ - /)[1],
        }    
        newFeed.push(entry);    
    });
    return newFeed
}


// parse the Wuxiaworld RSS feed JSON object to custom JSON
function parseNYtimes(jsonObj){
    var newFeed = [];
    jsonObj.splice(100, jsonObj.length);
    $.each(jsonObj, function(i, item){
        var description = new String(item['itunes:summary']['#text']).split(/Background reading/)
        description.splice(1, 0, '<br>Background reading')
        description = description.join('')
        var entry = {
            'title': item['itunes:title']['#text'],
            'summary': description,
            'url': item['enclosure']['@attributes'].url,
            'cover': item['itunes:image']['@attributes'].href,
        }
        newFeed.push(entry);
    });
    return newFeed
}


// take dogbreed and adds table to result table
function buttonBreeds(breedName){
    $("#mainResultTable tr").remove();
    var header = {
        "x-api-key": "83f7a2a5-5a1c-40b6-8eb3-30009b1b424c"
    }
    var response = APIcallGET("https://api.thedogapi.com/v1/breeds/search?q=" + breedName, header)
    breedsHead.appendTo('#mainResultTableHead');
    console.log(response)
    $.each(response.data, function(i, item){
        var $tr = $('<tr>').append(
            $('<td>').html(modalButton(item.id, item.name) + modalBox(item.id, item.name)),
            $('<td>').text(item.bred_for),
            $('<td>').text(item.breed_group),
            $('<td>').html('<p style="width:6rem;">' + item.life_span + '</p>'),
        ).appendTo('#mainResultTableBody');
    });
}


// takes breedID and adds img src in modal box
function imgModalBox(breedID){
    var header = {
        "x-api-key": "83f7a2a5-5a1c-40b6-8eb3-30009b1b424c"
    }
    var response = APIcallGET("https://api.thedogapi.com/v1/images/search?breed_id=" + breedID, header)

    document.getElementById('breedImg' + breedID).src = response.data[0].url
}


//Returns dynamic button with breeID
function modalButton(breedID, dogName){
    return '<button onclick="imgModalBox(' + breedID + ')" type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#' + 'breedModal' + breedID + '">' + dogName + '</button>'
}


//Return modalbox with custom information
function modalBox(breedID, dogName){
    return  '<div class="modal fade" id="' + 'breedModal' + breedID + '" tabindex="-1" role="dialog" aria-labelledby="dogBreedModal" aria-hidden="true">'+

                '<div class="modal-dialog " role="document">'+
                    '<div class="modal-content bg-secondary">'+
                        '<div class="modal-header">'+
                            '<h5 class="modal-title" id="exampleModalLabel">' + dogName + '</h5>'+
                            '<button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>'+
                        '<div class="modal-body d-flex justify-content-center">'+
                            '<img id="breedImg' + breedID + '" style="width:25rem;" src="" alt="' + dogName + '">'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
    
            '</div>'
}


// checks if scroll position is 20px or more and changes display state of backToTop button
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
}


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
