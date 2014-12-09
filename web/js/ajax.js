var ajaxUrl = '/api';

$(document).ready(function() {

  $('#ajaxButton').click(function() {
    var sData = {
      boxText: $('#ajaxInput').val()
    };
    console.log(sData); //отладка
    
    $.ajax({
      type: 'POST',
      url: ajaxUrl,
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
