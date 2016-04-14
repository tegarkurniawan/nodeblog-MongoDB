var Index = require('../controllers/index');
var Register = require('../controllers/register');
var Login = require('../controllers/login');
var Artikel = require('../controllers/artikel');
var Category = require('../controllers/category');

module.exports = function(app, upload, passport) {

	app.get('/', isGuest, Index.index);
	app.get('/readmore/:title', isGuest, Index.readmore);
	app.get('/dashboard', isLoggedIn, Index.home);
	app.get('/about', isLoggedIn, Index.about);	
	app.get('/artikel', isLoggedIn, Artikel.index);
	app.get('/artikel/create', isLoggedIn, Artikel.create);
	app.post('/artikel/store', isLoggedIn, upload.single('photo'), Artikel.store);
	app.get('/artikel/edit/:id', isLoggedIn, Artikel.edit);	
	app.post('/artikel/update/:id', isLoggedIn, upload.single('photo'),Artikel.update);
	app.get('/artikel/destroy/:id', isLoggedIn, Artikel.destroy);


	app.get('/category', isLoggedIn, Category.index);
	app.get('/category/create', isLoggedIn, Category.create);
	app.post('/category/store', isLoggedIn, Category.store);
	app.get('/category/edit/:_id', isLoggedIn, Category.edit);
	app.post('/category/update/:id', isLoggedIn, Category.update);
	app.get('/category/destroy/:id', isLoggedIn, Category.destroy);

	app.get('/login', isGuest, Login.index);
	app.post('/do/login', passport.authenticate('local-login', {
	        successRedirect : '/dashboard', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	app.get('/register', isGuest, Register.index);
	app.post('/do/register', passport.authenticate('local-signup', {
	        successRedirect : '/dashboard', // redirect to the secure profile section
	        failureRedirect : '/register', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

}





// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// route middleware to make sure a user is guest
function isGuest(req, res, next) {

	// if user is not authenticated in the session, carry on
	if (req.isUnauthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}