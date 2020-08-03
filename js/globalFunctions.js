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
