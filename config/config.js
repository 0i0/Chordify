var Config = module.exports = function Config(debug) {
  var config = {
    dev :   {debug : true
            ,orign : 'http://0.0.0.0:8000'
            ,port:8000
            ,sessionSecret : '50m35ecr3t'
            ,apis:{
                    google:{
                        ANALYTICS_ACCOUNT:'UA-XXXXXXXX-X'
                    }
                }
            },
    prod :  {debug : false
            ,orign : 'http://chordify.herokuapp.com'
            ,port:process.env.PORT
            ,sessionSecret : '50m35ecr3t'
            ,apis:{
                    google:{
                        ANALYTICS_ACCOUNT:'UA-XXXXXXXX-X'
                    }
                }
            }
  }
  return config[(debug)?'dev':'prod'];
}