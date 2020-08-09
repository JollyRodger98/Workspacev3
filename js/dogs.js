

$(document).ready(function(){

    $( "#buttonBreeds" ).click(function() {
        $("#mainResultTable tr").remove();
        $("#imageSpan img").remove();
        var header = {
            "x-api-key": "83f7a2a5-5a1c-40b6-8eb3-30009b1b424c"
        }
        var response = APIcallGET("https://api.thedogapi.com/v1/breeds", header)
        breedsHead.appendTo('#mainResultTableHead');
        $.each(response.data, function(i, item){
            var $tr = $('<tr>').append(
                $('<td>').html(modalButton(item.id, item.name) + modalBox(item.id, item.name)),
                $('<td>').text(item.bred_for),
                $('<td>').text(item.breed_group),
                $('<td>').html('<p style="width:6rem;">' + item.life_span + '</p>'),
            ).appendTo('#mainResultTableBody');
        });
    });

    $( "#buttonRandomImage" ).click(function() {
        $("#mainResultTable tr").remove();
        $("#imageSpan img").remove();
        var header = {
            "x-api-key": "83f7a2a5-5a1c-40b6-8eb3-30009b1b424c"
        }
        var response = APIcallGET("https://api.thedogapi.com/v1/images/search", header)
        $('#imageSpan').append('<img class="img-fluid rounded border" src="' + response.data[0].url + '">');
    });

});