require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var data2i = require('../data2i.json')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
  // automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

/*myOwnCode*/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
console.log(__dirname + ',' + data2i);
var apiRouter = express.Router();
apiRouter.get('/products', (req, res) => {
  res.json(data2i.products);
});
apiRouter.post('/login', (req, res) => {
  if (req.body.username == 'bobo' && req.body.password == '123456') {
    res.json({
      status: 0,
      msg: 'OK',
      res: {
        token: '111'
      }
    });
  } else {
    res.json({
      status: 401,
      msg: '账户名或密码错误'
    });
  }
});
apiRouter.post('/logout', (req, res) => {
  res.json({
    status: 0,
    msg: 'OK'
  });
});
apiRouter.get('/getUserInfo', (req, res) => {
  console.log(req);
  res.json({
    status: 0,
    msg: 'OK',
    res: {
      username: 'bobo',
      avatar: 'photo.png',
      roles: ['admin']
    }
  });
});
app.use('/api', apiRouter);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  })
  // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}