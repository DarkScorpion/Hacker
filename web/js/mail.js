var mailUrl = '/sendMail';

$(document).ready(function() {

  $('#ajaxButton').click(function() {
    var sData = {
      boxText: $('#ajaxInput').val()
    };
    
    $.ajax({
      type: 'POST',
      url: mailUrl,
      dataType: 'json',
      data: sData,
      success: function(data) {
        console.log(JSON.stringify(data));
        $('#ajaxOutput').html(data.result);
      },
      error: function(jqXHR, textStatus, errThrown) {
        console.log(jqXHR + ' ' + textStatus + ' ' + errThrown);
      }
    });
  })

}); 
