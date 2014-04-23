exports.info = function (str)
{
	console.log(getTime()+' '+str);
}

exports.getClientIP = function (req)
{ 
    with(req)
        return (headers['x-forwarded-for'] || '').split(',')[0] 
            || connection.remoteAddress;
}

function getTime()
{
    var d = new Date();
	s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
	t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    return '['+s+' '+t+']';
}