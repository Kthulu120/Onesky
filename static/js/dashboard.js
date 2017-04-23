/**
 * Created by Troy on 4/23/2017.
 */

  var  loadnetworkspeed = $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:8000/api/speedtest",
        dataType: 'json',
        complete: function (results) {
            var container = $('#speedtest-container');
            var mjsn = JSON.parse(results.responseJSON);
            console.log(mjsn);
            var upload = mjsn.upload;
            var download = mjsn.download;
            container.html(upload + " <i class=\"material-icons\">arrow_upward</i> /" + download + " <i class=\"material-icons\">arrow_upward</i>")
        }
    });

 window.onload = function(){
   setTimeout(loadnetworkspeed, 1000)
};