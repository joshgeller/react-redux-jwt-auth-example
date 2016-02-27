'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = new(require('express'))();
const port = 3000;

const config = require('./webpack.config');
const compiler = webpack(config);

const path = require('path');
//Mongo Interface
const authenticateEmail = require('./src/constants/mongo/authenticateEmail');
const registerNewUser = require('./src/constants/mongo/registerNewUser');
//
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.post('/auth/getToken/', (req, res) => {
    authenticateEmail(req.body.email, req.body.password)
      .then(token => {
        res
          .status(200)
          .json({token});
      })
      .catch(error => {
        console.error('getToken ERR:', error);
        res.sendStatus(403);
      });
});
app.post('/auth/registerUser', (req, res) => {
    registerNewUser(req.body)
      .then(result => {
        console.info('registerUser Result:', result);
        res.status(200).json(result)
      })
      .catch(err => {
        console.error('registerUser ERR:', err);
        // Send 422: Unprocessable Entity for validation error.
        res.sendStatus(422)
      });
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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/dist/index.html'));
});

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
