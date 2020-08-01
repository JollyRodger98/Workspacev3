$(document).ready(function(){

    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status == 200){
            console.log(JSON.parse(request.response));
        } else {
            console.log(`error ${request.status} ${request.statusText}`)
        }
    }

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            return response.json();
        })
        .then(users => {
            console.log(users);
        });
    
    //needs CDN
    //<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.log(error))
    
    //needs CDN
    //<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET",
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
    })

});