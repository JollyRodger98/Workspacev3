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

function addZero(digit){
    digit = String(digit);
    if (digit.length <= 1){
        digit = '0' + digit;
        }
    return digit
}

//dd.MM.YYYY hh:mm
function convertUnixFull(unixTime){
    var normalTime = new Date(unixTime * 1000);
    normalTime = addZero(normalTime.getHours()) + ':' + addZero(normalTime.getMinutes()) + ' ' + addZero(normalTime.getDate()) + '-' + addZero(normalTime.getMonth()) + '-' + normalTime.getFullYear();
    return normalTime
}

//hh:mm
function convertUnixTime(unixTime){
    var normalTime = new Date(unixTime * 1000);
    normalTime = addZero(normalTime.getHours()) + ':' + addZero(normalTime.getMinutes());
    return normalTime
}

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

function RSStoJSON(data){
    var xmlDoc = new window.DOMParser().parseFromString(data, "text/xml")
    var jsonObj = JSON.parse(JSON.stringify(xmlToJson(xmlDoc)));
    jsonObj = jsonObj.rss.channel.item
    return jsonObj
}

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
