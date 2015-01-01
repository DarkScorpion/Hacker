$(document).ready(function() {
  
  var randNum;
  var timeout = 300;
  var codeBlocks = $('.code-block');

  var changeNumbers = setInterval(function () {
    codeBlocks.each(function() {
      randNum = parseInt(RandomNumber(1000, 9999)); //4-значное число
      $(this).html(randNum); 
   });
   //clearInterval(changeNumbers); //окончание работы проверки
 }, timeout);
 
});

function RandomNumber(min, max)
{
  return Math.random() * (max - min) + min;
}