exports.getTime = function ()
{
    var d = new Date();
	s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
	t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    return '['+s+' '+t+']';
}
