'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = new(require('express'))();
const port = 3000;

const config = require('./webpack.config');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());


app.post('/auth/getToken/', (req, res) => {
    if (req.body.email == 'hello@test.com' && req.body.password == 'test') {
        res.status(200)
            .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'});
    } else {
        res.sendStatus(403);
    }
});

app.get('/getData/', (req, res) => {
    let token = req.headers['authorization'];
    if (!token) {
        res.sendStatus(401);
    } else {
        try {
            let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
            res.status(200)
                .json({data: 'Valid JWT found! This protected data was fetched from the server.'});
        } catch (e) {
            res.sendStatus(401);
        }
    }
})

// redirect all the requests not related to the API to the WebPack endpoint
app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath,'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});



app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
