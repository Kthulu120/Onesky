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
}

$( ".note-title" ).click(function() {
    fun("http://127.0.0.1:8000/bucketlists/" + $(".note-title").textContent);
});


var fun = function (url) {
    var xhr = new XMLHttpRequest();
xhr.open("GET", ""+url, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
      var resp = xhr.responseText
    if (xhr.status === 200) {
      console.log(xhr.responseText);
       // $('.ql-editor').html("" + resp)
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);
}