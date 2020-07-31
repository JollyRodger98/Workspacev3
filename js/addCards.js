$(document).ready(function() {

    function addDiv(item){
        var elm = '<div class="col-12 col-md-4 col-lg-3 col-xl-2 my-1 my-md-2 d-flex justify-content-center">'+
            '<div class="card bg-primary p-1" style="width: 15rem;">'+
            '<img class="card-img-top" src="'+item.img+'" alt="'+item.name+'">'+
            '<div class="card-body">'+
            '<h5 class="card-title">'+item.name+'</h5>'+
            '<a href="'+item.link+'" class="btn btn-light" target="_blank">Visit site</a>'+
            '</div>'+
            '</div>'+
            '</div>';
            $(elm).appendTo('#' + item.placement);
    }

    function sortPos(tmpLinkList){
        tmpLinkList = tmpLinkList.sort(function(a, b){return a.category.pos - b.category.pos;});
        return tmpLinkList;
    }

    var page = String(window.location.pathname).split("/").pop();
    var utilityList = new Array();
    var gamingList = new Array();
    var programmingList = new Array();
    var mangasList = new Array();
    var booksList = new Array();
    var novelsList = new Array();
    var jsonLinkList = new Array();
    var mainlinkList = new Array();
    
    jsonLinkList = (function(){
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "json/linkList.json",
            'dataType': "json",
            'success': function(data) {
                json = data;
            }
        });
        return json;
    })();
    

    $.each(jsonLinkList, function(i, item){
        if (item.category.main == 'Technology' && page == 'technology.html'){
            if (item.category.sub == 'Utility'){
                utilityList.push(item);
            } else if(item.category.sub == 'Gaming'){
                gamingList.push(item);
            } else if(item.category.sub == 'Programming'){
                programmingList.push(item);
            }
        } else if (item.category.main == 'Books' && page == 'books.html'){
            if (item.category.sub == 'Mangas'){
                mangasList.push(item);
            } else if(item.category.sub == 'Books'){
                booksList.push(item);
            } else if(item.category.sub == 'Novels'){
                novelsList.push(item);
            }
        }
    });
    
    
    if (page == 'technology.html'){
        mainlinkList.push(utilityList, programmingList, gamingList)
    }else if (page == 'books.html'){
        mainlinkList.push(mangasList, booksList, novelsList)
    }
    
    $.each(mainlinkList, function(i, linkList){
        sortPos(linkList)
        $.each(linkList, function(j,item){
            addDiv(item)
        });
    });

});