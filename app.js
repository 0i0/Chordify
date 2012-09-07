var config = require('./config/config')(true) //DEBUG?

// Dependencies.

var express = require('express')
  , request = require('request')
  , redis = process.env.REDISTOGO_URL 
        ? require('redis-url').connect(process.env.REDISTOGO_URL) 
        : require('redis').createClient()
  , RedisStore = require('connect-redis')(express)
  , jsdom = require("jsdom")
  , under = require("underscore")
  , MemoryStore = require('connect').session.MemoryStore

// Framework 
var util = require('util')

// Globals
var app = require('express').createServer()
  , sessionStore = new MemoryStore({})

app.configure(function(){
  app.set('views',__dirname + '/views')
  app.set('view engine', 'jade')
  app.set('view options', { layout: false })
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.static(__dirname + '/client'))
  app.use(require('stylus').middleware({ src:'public' }))
  app.use(express.cookieParser())
  app.use(express.session({store: sessionStore, secret: config.sessionSecret}))
  app.use(app.router)
})

// Routes
require('./boot')( under
                 ,app
                 , config
                 , util
                 , request
                 , redis
                 , jsdom
                 )

if (!module.parent) {
  var port = process.env.PORT || config.port
  app.listen(port)
  console.log('Express app started on port %d', port)
}





