var express = require('express'),
	path = require('path'),
	http = require('http'),
	routes = require('./routes/routes');
	
var app = express();	
	
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
	app.use(express.cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.session({
		secret: "randomString",
		cookie: {httpOnly: true}
	}));
	app.use(express.csrf());
	app.use(function(req,res,next) {
		res.cookie('_csrf',req.session._csrf);
		next();
	});
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Listen on port " + app.get('port'));
});