app.get('/', function(req, res){
  res.render('main.jade', { 
      config: config
      ,req:req
  });
});