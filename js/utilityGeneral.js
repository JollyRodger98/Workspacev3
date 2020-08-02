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
        return {'data': data, 'status': {'code': statusCode, 'text': statusText}};
    }

    var response = APIcall("https://jsonplaceholder.typicode.com/users")
    console.log(response);


});