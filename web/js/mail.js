var mailUrl = '/api/sendMail';

$(document).ready(function() {

  $('#btnMail').click(function() {
    $('#info').html('Ожидание');
    
    var sendData = {
      message: $('#text-mail').val()
    };
    
    $.ajax({
      type: 'POST',
      url: mailUrl,
      data: sendData,
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
