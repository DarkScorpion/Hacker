
var URI = 'http://localhost:3000/api';

$(document).ready(function(){

  $('#ajaxButton').click(function(){
    var sData = $('#ajaxInput').val();
    console.log(sData); //отладка
    $.ajax({
      type: 'POST',
      url: URI,
      dataType: 'html',
      data: sData,
      success: function(data) {
        console.log(data);
      //$('#ajaxOutput').load(data);
      },
      error: function(jqXHR, textStatus, errThrown) {
        console.log(jqXHR + ' ' + textStatus + ' ' + errThrown);
      }
    });
  })

}); 
