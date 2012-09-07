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
	jsdom.env(url, [
	  'http://code.jquery.com/jquery-1.5.min.js'
	],
	function(errors, window) {
		var results = window.$(".tresults .stripe")
		var list = []
		for (var i = results.length - 1; i >= 0; i--) {
			var reslink = window.$(results[i])
			var rating =  (reslink.find('.rating > *') && reslink.find('.rating > *').attr('class'))
					?reslink.find('.rating > *').attr('class').replace('r_','')
					:0;
			var link =  reslink.find('a')
					?reslink.find('a').attr('href')
					:null;
			var type =  reslink.find('td')[3]
					?window.$(reslink.find('td')[3]).text()
					:null;
			list.push({
				link: link
				,rating: rating
				,type:type
			})				
		};
		list.sort(function(b,a){
			return b.rating < a.rating
		})
		list = under.filter(list,function(item){return item.type == 'chords' })
		if (list[0]) {
			console.log(list[0].link)
			jsdom.env(list[0].link, [
		  		'http://code.jquery.com/jquery-1.5.min.js'
			],function(errors, window) {
				res.write(window.$('#cont')[0].innerHTML)
				res.end()
			})
		}else{
			res.write('no chords found');
			res.end()
		}
	});
});