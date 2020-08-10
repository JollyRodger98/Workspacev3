
$(document).ready(function(){

    function getSeachValue(){
        var searchValue = document.getElementById("defaultSearchField").value;
        document.getElementById('defaultSearchForm').reset();
        return searchValue
    }

    function parseBookDate(publishedDate){
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //console.log(new Date(publishedDate))
        if (String(publishedDate).length == 4){
            return publishedDate
        } else if(String(publishedDate).length == 10){
            publishedDate = String(publishedDate).split('-');
            publishedDate = [publishedDate[1], publishedDate[2], publishedDate[0]];
            publishedDate = publishedDate.join(' ');
            publishedDate = new Date(publishedDate);
            publishedDate = addZero(publishedDate.getDate()) + '. ' + monthNames[publishedDate.getMonth()] + ' ' + publishedDate.getFullYear();
            return publishedDate;
        } else{
            return publishedDate
        }
    }

    function parseBookAuthor(authors){
        if (typeof(authors) == 'undefined'){
            return 'No known author'
        }else if(authors.length == 1){
            return authors            
        }else{
            return authors = authors.join(', ')
        }
    }

    function searchBooks(searchValue){
        var response = APIcallGET('https://www.googleapis.com/books/v1/volumes?key=AIzaSyBR64x3mikfahvV4buG6E2tIMPPVqgxQ14&q=' + searchValue)
        //console.log(response)
        $('#mainResultTableHead').append('<tr><th colspan="3">Results for: "' + searchValue + '"</th></tr>')
        bookHead.appendTo('#mainResultTableHead');
        $.each(response.data.items, function(i, item){
            var $tr = $('<tr>').append(
                $('<td>').html( '<img class="img-thumbnail" src="' + item.volumeInfo.imageLinks.smallThumbnail + '">'),
                $('<td>').text(item.volumeInfo.title),
                $('<td>').text(parseBookAuthor(item.volumeInfo.authors)),
                $('<td>').text(parseBookDate(item.volumeInfo.publishedDate)),
            ).appendTo('#mainResultTableBody');
        });
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
