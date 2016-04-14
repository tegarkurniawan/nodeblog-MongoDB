var Artikel = require('../models/Artikel');
var Category = require('../models/Category');
module.exports.index = function(req, res) {

	Artikel.find().populate('category_id').exec(function(err, doc) {

		if (err) {
					console.log(err);
				}
		Category.find(function(err2, rows) {
			
			if (err2) {
					console.log(err2);
				}

			res.render('index/index', {artikels: doc, categorys: rows});

		});	
		
	});	

}

module.exports.readmore = function(req, res) {

	var title = req.params.title;

	Artikel.find({title: title}).populate('category_id').exec(function(err, doc) {

		if (err) {
					console.log(err);
				}
		Category.find(function(err2, rows) {
			
			if (err2) {
					console.log(err2);
				}

			res.render('index/readmore', {artikel: doc, categorys: rows});

		});	
		
	});	

}

module.exports.home = function(req, res) {
	res.render('index/home', {userAuth: req.user});
}

module.exports.about = function(req, res) {
	res.render('index/about', {userAuth: req.user});
}