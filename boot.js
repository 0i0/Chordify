
/**
 * Module dependencies.
 */

var vm = require('vm')
  , fs = require('fs');

module.exports = function(under
                         , app
                         , config
                         , util
                         , request
                         , redis
                         , jsdom
                         ){
  
  var dir = __dirname + '/routes';

  fs.readdirSync(dir).forEach(function(file){
    var str = fs.readFileSync(dir + '/' + file, 'utf8');
    var context = { under : under
                  , app: app
                  , config: config 
                  , util: util
                  , request: request
                  , redis: redis
                  , jsdom: jsdom
                  };
    for (var key in global) context[key] = global[key];
    vm.runInNewContext(str, context, file);
  });
};