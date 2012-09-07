var Config = module.exports = function Config(debug) {
  var config = {
    dev :   {debug : true
            ,orign : 'http://0.0.0.0:8000'
            ,port:8000
            ,sessionSecret : 'PUT_YOURS_HERE'
            ,twitter : {
                username:'PUT_YOURS_HERE'
                ,password:'PUT_YOURS_HERE'
            }
            ,apis:{
                    facebook:{
                        APP_ID : 'FB_APP_ID'
                        ,APP_SECRET : 'FB_APP_SECRET'
                    }
                    ,twitter:{
                        consumer_key: 'PUT_YOURS_HERE'
                        , consumer_secret: 'PUT_YOURS_HERE'
                        , token: 'PUT_YOURS_HERE'
                        , token_secret: 'PUT_YOURS_HERE'
                    }
                    ,google:{
                        ANALYTICS_ACCOUNT:'UA-XXXXXXXX-X'
                    }
                }
            },
    prod :  {debug : false
            ,orign : 'http://PUT_YOURS_HERE.herokuapp.com'
            ,port:process.env.PORT
            ,sessionSecret : 'PUT_YOURS_HERE'
            ,twitter : {
                username:'PUT_YOURS_HERE'
                ,password:'PUT_YOURS_HERE'
            }
            ,apis:{
                    facebook:{
                        APP_ID : 'FB_APP_ID'
                        ,APP_SECRET : 'FB_APP_SECRET'
                    }
                    ,twitter:{
                        consumer_key: 'PUT_YOURS_HERE'
                        , consumer_secret: 'PUT_YOURS_HERE'
                        , token: 'PUT_YOURS_HERE'
                        , token_secret: 'PUT_YOURS_HERE'
                    }
                    ,google:{
                        ANALYTICS_ACCOUNT:'UA-XXXXXXXX-X'
                    }
                }
            }
  }
  return config[(debug)?'dev':'prod'];
}