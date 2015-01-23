var mailUrl = '/sendMail';

$(document).ready(function() {

  $('#btnMail').click(function() {
    $('#info').html('Ожидание');
    var sData = {
      boxText: $('#text-mail').val()
    };
    
    $.ajax({
      type: 'POST',
      url: mailUrl,
      data: sData,
      dataType: 'json',
      success: function(data) {
        $('#info').html(data.result);
      },
      error: function(jqXHR, textStatus, errThrown) {
        $('#info').html('Ошибка при отправке данных');
      }
    });
  })

}); 
