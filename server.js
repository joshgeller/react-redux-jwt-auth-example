var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = new(require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.post("/auth/getToken/", function(req, res) {
 console.log('auth token requested');
    if (req.body.email == 'hello@test.com' && req.body.password == 'test') {
        res.status(200)
            .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'})
    } else {
        res.sendStatus(403);
    }

});
app
    .get("/getData/", function(req, res) {
        console.log(req.headers);
        var token = req.headers['authorization'];
        if (!token) {
            console.log("No token");
            res.sendStatus(401);
        } else {
            try {
                var decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
                console.log("Decoded token: ");
                console.log(decoded);
                res.status(200)
                    .json({data: 'Valid JWT found! This protected data was fetched from the server.'})
            } catch (e) {
                res.sendStatus(401);
            }

        }
    })

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
