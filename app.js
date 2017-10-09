var express = require('express')
  , util = require('util')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var app = express()

app.use(express.static(__dirname ))

app.get('/',function(req,res){
  res.render('index')
})
app.get('/api/getChords/:artist/:song', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("content-type", "text/plain");

  	artist = req.params.artist
	song = req.params.song
	var url = util.format('http://www.ultimate-guitar.com/search.php?search_type=title&value=%s+%s'
		,artist.replace(' ','+')
		,song.replace(' ','+')
		);
	console.log('url:',url)
	JSDOM.fromURL(url, {}).then(dom => {
  		var list = []
  		var results = dom.window.document.querySelectorAll(".tresults tbody tr")
  		for (var i = results.length - 1; i >= 0; i--) {
  			var resline = results[i]
  			  , ratingDom = resline.querySelector('.ratdig')
  			  , linkDom = resline.querySelector("a")
			  , typeDom = resline.querySelectorAll("td")[3]
			var rating = ratingDom?ratingDom.innerHTML:-1
			  , link = linkDom?linkDom.href:null
			  , type = typeDom?typeDom.querySelector('strong').innerHTML:null
			list.push({
				link: link
				,rating: rating
				,type:type
			})			
		};
		list.sort(function(b,a){
			return b.rating < a.rating
		})
		list = list.filter(item => item.type == 'chords' )
		if (list[0]) {
			console.log(list[0].link)
			JSDOM.fromURL(list[0].link, {}).then(dom => {
				res.write(dom.window.document.querySelector('#cont').innerHTML)
				res.end()
			}).catch(function(e) {
  				res.write(e);
				res.end()
			});
		}else{
			res.write('no chords found');
			res.end()
		}
	}).catch(function(e) {
  		res.write(e);
		res.end() // "oh, no!"
	});
});
if (!module.parent) {
  app.listen(process.env.PORT || 5000);
  console.log('Express started on port 5000');
}