
$(document).ready(function(){

    function getSeachValue(){
        var searchValue = document.getElementById("defaultSearchField").value;
        document.getElementById('defaultSearchForm').reset();
        return searchValue
    }

    function searchBooks(searchValue){
        var response = APIcallGET('https://www.googleapis.com/books/v1/volumes?key=AIzaSyBR64x3mikfahvV4buG6E2tIMPPVqgxQ14&q=' + searchValue)
        jokeHead.appendTo('#mainResultTableHead');
        $.each(response.data.items, function(i, item){
            var $tr = $('<tr>').append(
                $('<td>').text(item.volumeInfo.title),
            ).appendTo('#mainResultTableBody');
        });
        console.log(response)
    }

    $( "#defaultSearchButton" ).click(function() {
        var selectValue = document.getElementById('selectSearch');
        selectValue = selectValue.options[selectValue.selectedIndex].value;
        $("#mainResultTable tr").remove();

        if(selectValue == 'bookSearch'){
            var searchValue = getSeachValue();
            if(searchValue != ''){
                searchBooks(searchValue);
            }
        }


        
    });
    
});
