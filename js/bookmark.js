//listen for form submision
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }

    //gets the input ready for localStorage
    var bookmark = {
        name: siteName,
        url: siteURL
    }
/*
    //localStorage Test
    localStorage.setItem('test', 'Hello Suckers!');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
*/

//test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //set to localSorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}else{
    //get bookmarks from localStorage => return to json form
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmarks to array
    bookmarks.push(bookmark);
    //re-set it back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}

    //clear the form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();


}

function deleteBookmark(url){
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        //if the current url matches the url intended for deletion
        if(bookmarks[i].url == url){
            //remove current url from array
            bookmarks.splice(i, 1);
        }
    }
    //re-set it back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//get the bookmarks from Local Storage and dislay them
function fetchBookmarks (){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get outout id
    var bookmarkResults = document.getElementById('bookmark-results');

    //build the output
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        //[i] => current iteration
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      '<a class="btn btn-default" target="_blank" href="'+url+'">Check it Out!</a>' +
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">delete</a>' +                                      
                                      '</h3></div> ';
    }


}

function validateForm(siteName, siteURL){
     //checks to see if name and url are blank 
     if(!siteName || !siteURL){
        alert('Please fill in the form.');
        //stops it from going to localStorage
        return false;
    }

    //reg ex to match
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}