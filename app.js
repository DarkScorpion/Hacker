var express = require('express'), app = express();//Create server
var supplib = require('./supplib');// connect supplib
app.set('views', __dirname); // for Jade rendering
app.use('/templates', express.static(__dirname + '/templates')); //for css files

app.get('/', function(req, res) 
{
	console.log('*Open title page*');
    res.render('./templates/index.jade', 
    {
        title: 'My Site'
    });
});

app.get('/girl=:girlName;:imageUrl', function(req, res) 
{
	console.log('!Open girls page!');
    res.render('./templates/girl.jade', 
    {
    	pageData:
    	{
        	gName: 'girlName',
        	iUrl: 'imageUrl'
    	}
    });
});

app.get('/id=:id([0-9]+)', function(req, res) 
{
	console.log('id='+req.params.id);
    res.send('id='+req.params.id);
});

app.get('/name=:name;:last', function(req, res)
{
    res.send('Hello '+req.params.name+' '+req.params.last);
    console.log('Name='+req.params.name+'; Last='+req.params.last);
});

app.get('*', function(req, res) 
{
    res.send('Wrong Data', 404);
    console.log('Wrong Params: '+req.params.length);
    for(var i=0;i<req.params.length;i++)
        console.log(req.params[i]);
});
app.listen(process.env.VCAP_APP_PORT || 3000);

console.log('Node Express.js is runing: '+ supplib.getTime());