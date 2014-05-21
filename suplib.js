exports.i = function (str) //i = info
{
	console.log(iTime()+' '+str);
}

exports.d = function (str) //d = debug
{
	console.log(dTime()+' '+str);
}

exports.sms = function (id, number, text)
{
	//TODO
	console.log(iTime()+' '+'Sms is send:'+
		'\n\tnumber: '+number+
		'\n\tmessage: '+text);
}

exports.getClientIP = function (req)
{ 
    with(req)
        return (headers['x-forwarded-for'] || '').split(',')[0] 
            || connection.remoteAddress;
}

function iTime()
{
    var d = new Date();
	s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
	t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
    return '['+s+' '+t+']';
}

function dTime()
{
    var d = new Date();
	s = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
	t = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
    return '['+s+' '+t+']';
}