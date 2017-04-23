var Delta = Quill.import('delta');
var quill = new Quill('.editor-container', {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    scrollingContainer: '.scrolling-container',
    placeholder: 'Compose an epic...',
    theme: 'snow'
});

// Store accumulated changes
var change = new Delta();
quill.on('text-change', function(delta) {
    change = change.compose(delta);
});

// Save periodically
setInterval(function() {
    if (change.length() > 0) {
        console.log('Saving changes', change);
        /*
         Send partial changes
         $.post('/your-endpoint', {
         partial: JSON.stringify(change)
         });

         Send entire document
         $.post('/your-endpoint', {
         doc: JSON.stringify(quill.getContents())
         });
         */
        change = new Delta();
    }
}, 5*1000);

// Check for unsaved data
window.onbeforeunload = function() {
    if (change.length() > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
    }
};




var fun = function (url) {
    var xhr = new XMLHttpRequest();
    var self  = this;
xhr.open("GET", "http://127.0.0.1:8000/bucketlists/"+url, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
      var resp = xhr.responseText;
      var jsonresp = $.parseJSON(resp);
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      var info = jsonresp['info'];
      $('.ql-editor.ql-blank').html(""+ info + "");
       // $('.ql-editor').html("" + resp)
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.alert = function (e) {
    var response = xhr.responseText;
    $('.ql-editor.ql-blank').html("<p>"+ xhr.responseText + "</p>");
};
xhr.onerror = function (e) {
  //console.error(xhr.statusText);
};
xhr.send(null);
};
var save = function (noteName) {
     var xhr = new XMLHttpRequest();
     xhr.open("POST", "http://127.0.0.1:8000/bucketlists/" + noteName, true)
     xhr.onload = function (e) {
         if (xhr.readyState === 4) {
             var resp = xhr.responseText;
             if (xhr.status === 200) {
                 console.log(xhr.responseText);
                 var info = resp['info'];
                 $('.ql-editor.ql-blank').html("" + info);
                 // $('.ql-editor').html("" + resp)
             } else {
                 console.error(xhr.statusText);
             }
         }
     };

 };

 function clickHandler(e) {
    var target = (e.target) ? e.target : e.srcElement;

    console.log(target);
    return target;
}
/*
$(document).click(function(event) {
    var text = $(event.target).text();
    console.log(text);
});
*/

function gosearch(id){
    id = id.toString();
    var xhr = new XMLHttpRequest();
   // console.log(xhr);
    var url = id;
   // console.log(url);
 //   url = url.toString();
//    url = url.trim();
    var noteTitle = "" + url;
    replace_textinput(noteTitle);
    var slug = slugify(url);
    slug = slug.toLowerCase();
    //console.log(slug);
 //   submitNoteForChecking(slug);
xhr.open("GET", "http://127.0.0.1:8000/bucketlists/"+ slug, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
      var resp = xhr.responseText;
      var jsonresp = $.parseJSON(resp);
    if (xhr.status === 200) {
     // console.log(xhr.responseText);
      var info = jsonresp['info'];
     console.log("Heres info " +info);
      //$(".ql-editor").empty();
      $('.ql-editor').html(""+ info + "");
       // $('.ql-editor').html("" + resp)
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.alert = function (e) {
    var response = xhr.responseText;
    $('.ql-editor.ql-blank').html("<p>"+ xhr.responseText + "</p>");
};
xhr.onerror = function (e) {
  //console.error(xhr.statusText);
};
xhr.send(null);
}

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}



var submitNoteForChecking = function (slug) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/bucketlists/"+ slug, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            var resp = xhr.responseText;
            var jsonresp = $.parseJSON(resp);
            if (xhr.status === 200) {
     // console.log(xhr.responseText);
                var info = jsonresp['info'];
                console.log("it works");
                notePUTRequest(slug);
      //$(".ql-editor").empty();
       // $('.ql-editor').html("" + resp)
    } else {

                createNewNote();
                console.log("Lets do our other method");
                console.error(xhr.statusText);
    }
  }
};


xhr.alert = function (e) {
    var response = xhr.responseText;

};
xhr.onerror = function (e) {
  //console.error(xhr.statusText);
};
xhr.send(null);

};


var notePUTRequest = function (slug) {
  //  var quillHTML = $('.ql-editor.ql-blank').html();
  //  var element = document.getElementById("new-element-1");
    var quillHTML = $('.ql-editor').html().toString();
    //var elementHtml = element.outerHTML;
    //quillHTML = quillHTML.toString();
    console.log(quillHTML);
    var quilltitle = slug;
    console.log(slug);
  //   var xhr = new XMLHttpRequest();
    $.ajax({
    type: 'PUT', // Use POST with X-HTTP-Method-Override or directly a PUT if the browser/client supports it
    dataType: 'application/json', // If your request format is JSON
    url: "http://127.0.0.1:8000/bucketlists/" + slug + "/", // Your API URL
    headers: {"X-HTTP-Method-Override": "PUT"}, // You should override this if you used "POST" early X-HTTP-Method-Override set to PUT
    data: {"title": ""+ quilltitle,"info": "" + quillHTML} // The username/userId of the user who clicked the button
    });

};



var replace_textinput = (function (text) {
        var mytext = text;
        var noteTitleEditField = $('.selected-note-title');
        noteTitleEditField.val("" + mytext);
});

var get_text = function () {
    var noteTitleEditField = $('.selected-note-title');
    //console.log(noteTitleEditField.val());
    var text  =noteTitleEditField.val();
    if (validateForm() === true) {
        return text;
    }
    return "null";
};

var buttonNote = function () {
  var noteName = get_text();
  //console.log(noteName);
  var slug = slugify(noteName);
  if (noteName = null || noteName === "null"){
    alert("Enter title for note");
  }else {
    //  console.log(slug);
      submitNoteForChecking(slug);
  }
};

var createNote = function (note_title) {

};

var validateForm = function () {
        var a = document.forms["Form"]["note-title-input"].value;
      //  console.log(a.toString());
    return !(a == null || a == "");
};


var  trimQuill = function (quillEditorText) {
    var editedText = quillEditorText;
    editedText = quillEditorText.trim(10);
    console.log(editedText);
    editedText = editedText.trim(0, -3);
    console.log(editedText);
};


var createNewNote = function(){
    var quillHTML = $('.ql-editor').html().toString();
    console.log(quillHTML);
    var quilltitle = document.forms["Form"]["note-title-input"].value;
    console.log(quilltitle);
    var slug  = slugify(quilltitle);
  //   var xhr = new XMLHttpRequest();
    $.ajax({
    type: 'POST', // Use POST with X-HTTP-Method-Override or directly a PUT if the browser/client supports it
    dataType: 'application/json', // If your request format is JSON
    url: "http://127.0.0.1:8000/bucketlists/", // Your API URL
    headers: {"X-HTTP-Method-Override": "POST"}, // You should override this if you used "POST" early X-HTTP-Method-Override set to PUT
    data: {"title": ""+ quilltitle,"info": "" + quillHTML} // The username/userId of the user who clicked the button
    });
    addNoteHTMLElement(quilltitle);


};

var addNoteHTMLElement = function (NoteTitle) {
  var noteHTML = "<div class='row'> <div class='note-title'><h4 class='post-title' onclick='gosearch(" +slugify(NoteTitle)+ ")'>"+ NoteTitle+ "</h4> </div></div>";
  $('#content').append(noteHTML);
};

var clearNotePad = function () {
    $(".ql-editor").html("<p></p>");
    document.forms["Form"]["note-title-input"].value = "";
};


/*
$('.post-title').on('click', function(){

    var id  = $('.post-title').attr("id");
    var xhr = new XMLHttpRequest();
    console.log(xhr);
    var url = id;
    console.log(url);
    url = url.toString();
//    url = url.trim();
    console.log(url);
    var slug = slugify(url);
    slug = slug.toLowerCase();
    console.log(slug);
xhr.open("GET", "http://127.0.0.1:8000/bucketlists/test", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
      var resp = xhr.responseText;
      var jsonresp = $.parseJSON(resp);
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      var info = jsonresp['info'];
      console.log(info);
      //$(".ql-editor").empty();
      $('.ql-editor').html(""+ info + "");
       // $('.ql-editor').html("" + resp)
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.alert = function (e) {
    var response = xhr.responseText;
    $('.ql-editor.ql-blank').html("<p>"+ xhr.responseText + "</p>");
};
xhr.onerror = function (e) {
  //console.error(xhr.statusText);
};
xhr.send(null);
});
*/
