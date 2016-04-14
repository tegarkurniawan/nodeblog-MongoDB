var Category = require('../models/Category');

module.exports.index = function(req, res) {
	Category.find(function(err, doc) {

		if (err) {
			console.log(err);
		}

		res.render('index/category', {userAuth: req.user, categorys: doc});	
	});	
};

module.exports.create = function(req, res) {

	res.render('index/category-create', {userAuth: req.user});

};

module.exports.store = function(req, res) {


	Category.create({
		name: req.body.name,

	}, function(err, rows) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/Category');
		}
	});

};

module.exports.edit = function(req, res) {

	var id = req.params.id;

	Category.find({id: id}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		console.log(doc);
		res.render('index/category-edit', {userAuth: req.user, categorys: doc});	
	});

};

module.exports.update = function(req, res) {

	var id = req.params.id;
	console.log(id);
	Category.update({_id: id}, 
			{
				$set: {
					name: req.body.name, 
				}
			} , function(err, doc) {
				if (err) {
					console.log(err);
				}
				res.redirect('/category');
		});

};

module.exports.destroy = function(req, res) {
	var id = req.params.id;

	Category.remove({_id: id}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		res.redirect('/category');
	});
};