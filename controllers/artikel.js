var Artikel = require('../models/Artikel');
var Category = require('../models/Category');

module.exports.index = function(req, res) {
	Artikel.find().populate('category_id').exec(function(err, doc) {

		if (err) {
			console.log(err);
		}

		res.render('index/artikel', {userAuth: req.user, artikels: doc});	
	});	
};

module.exports.create = function(req, res) {

	Category.find(function(err, doc) {

		res.render('index/artikel-create', {userAuth: req.user, categorys: doc});

	});	

};

module.exports.store = function(req, res) {

	//var input = JSON.parse(JSON.stringify(req.body));
	if (req.file != undefined) {
		var inputFile = req.file;
	} else {
		var inputFile = { filename: 'default.jpg' };
	}

	Artikel.create({
		title: req.body.title,
		description: req.body.description,
		category_id: req.body.category_id,
		photo: inputFile.filename
	}, function(err, Artikel) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/artikel');
		}
	});

};

module.exports.edit = function(req, res) {

	var id = req.params.id;

	Artikel.find({_id: id}).populate('category_id').exec(function(err, doc) {
			if (err) {
				console.log(err);
			}
		Category.find(function(err2, rows) {

			if (err2) {
				console.log(err2);
			}

			res.render('index/artikel-edit', {userAuth: req.user, artikel: doc, categorys: rows});	
		});
		
	});

};

module.exports.update = function(req, res) {

	var id = req.params.id;

	if (req.file != undefined) {
		var inputFile = req.file;
	} else {
		Artikel.find({id: id}, function(err, doc) {
		var inputFile = doc.photo;
		});
	}

	Artikel.update({_id: id}, 
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					category_id: req.body.category_id,
					photo: inputFile.filename
				}
			} , function(err, doc) {
				if (err) {
					console.log(err);
				}
				res.redirect('/artikel');
		});

};

module.exports.destroy = function(req, res) {
	var id = req.params.id;

	Artikel.remove({_id: id}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		res.redirect('/artikel');
	});
};