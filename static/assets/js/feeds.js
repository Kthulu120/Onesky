$(function () {
    constructFeeds();
});

$(document).on('buttonClick', function() {
    if (appended === 1){
        $('.modal-body').innerHTML("");
    }
      $('.modal-body').append(populateModal(feedArray));
    appended = 1;
});
$(document).on('saveClick', function() {
    saveFeeds();
});


var saveFeeds = function () {

    var string = "";
    for (var  i = 0; i < feedlist.length; i++ ) {
        if (i === 0) {
            string += feedlist[i].toString();
        }
        else{
            string += ";"+feedlist[i].toString();
        }
    }
    localStorage.setItem("rss-feeds",string);
    constructFeeds();



};
var appended = 0;

//language=HTML
var modalBody = "<div class=\"card\">\
<div class\=\"card-header\" data-background-color=\"purple\"><h4 class=\"title\">RSS Feeds</h4>\
<p class=\"category\">Here is a subtitle for this table</p></div>\
							<div class=\"card-content table-responsive\">\
								<table class=\"table\">\
									<thead class=\"text-danger\">\</thead><tbody><tr><td><div class=\"form-group label-floating\"><label class=\"control-label\">URL Here</label>\
<div class='row'><div class='col-lg-11 col-md-11 col-sm-11'><input type=\"text\" class=\"form-control rss-feed\" id='rss-form'></div><div class='col-sm-1 col-md-1 col-lg-1'><i class='material-icons' onclick='addFeed()'>add</i> </div></td></tr>";
var modalCloseTags = "</tbody></table></div></div>";

$(function() {
  var button = $('#dope') , modal = $('.modal-body');

  button.on('click', function() {

    $(document).trigger('buttonClick');
  });
});
$(function() {
  var save = $('#saveButton') , modal = $('.modal-body');

  save.on('click', function() {

    $(document).trigger('saveClick');
  });
});

var makeFeedArray = function (feedlist) {
    var ray = [], url , position, split = [],newRay = [] ;
    for (var  i = 0; i < feedlist.length; i++ ){
        console.log(feedlist[i].toString());
        split = feedlist[i].split(",");
        url = split[0];
        position = split[1];
        newRay = [split, url];
        ray.push(split)
    }
    return ray;

};


var  populateModal = function (feedArray) {
    if (localStorage.getItem("rss-feeds") === null){
        return modalBody + modalCloseTags;
    }
    var html = "";
    for (var  i = 0; i < feedArray.length; i++ ){
        url = feedArray[i][0];
        console.log(url);
        position = feedArray[i][1];
        console.log(position);
        html += "<tr id='"+ position  + "'><td><div class='row'><div class='feed-url col-lg-11 col-md-11 col-sm-11'>" + url +  "</div><div class='col-sm-1 col-md-1 col-lg-1'><i class='material-icons' onclick=\"$(this.parentNode.parentNode.parentNode.remove()); removeFeed(parseInt(this.parentNode.parentNode.parentNode.id))\" >clear</i></div></div></td></tr>";
        console.log(html);
    }
    return modalBody + html + modalCloseTags;
};

var removeFeed = function (index) {
    feedlist = feedlist.splice(index,1);
};
var addFeed = function () {
    if (checkValue()){
        var value = $('#rss-form').val();
        var ar = [value, feedlist.length-1 ];
        feedlist.push(ar);
    }
    $('#rss-form').value = "";
};

var checkValue = function () {
  var form = $('#rss-form');
    if (form.val() === ""){
      alert("Enter RSS Feed");
        return false;
    }
    return true
};

var constructFeeds = function () {
    for (var  i = 0; i < feedlist.length; i++ ){
        split = feedlist[i].split(",");
        url = split[0];
        position = split[1];
        var feed = "<div class='col-md-4'><div class='rss-wrapper' id='feed"+ position + "'></div></div>";
        $('#main-content').append(feed);
        $('#feed'+ position).FeedEk({
            FeedUrl:'' + url,
            MaxCount: 5,
            ShowDesc: false,
            ShowPubDate: false
});
    }

};

var localStorFeeds =  localStorage.getItem("rss-feeds");
var feedlist = localStorFeeds.split(";");
var feedArray = makeFeedArray(feedlist);













