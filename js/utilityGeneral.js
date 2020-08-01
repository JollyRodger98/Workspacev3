$(document).ready(function(){

    function APIcall(url){
        $.ajax({
            url: url,
            async: false,
            crossDomain: true,
            complete: function(response){
                data = response.responseJSON;
                status = response.status;
            }
        });
        return {data: data, status: status};
    }

    var data = APIcall("https://jsonplaceholder.typicode.com/users")
    console.log(data);


});