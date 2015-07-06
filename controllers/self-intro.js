exports.index = function(req, res, next) {
	res.render('self-intro', {
		blog: '', 
	  	projects: '', 
	  	contact: '',
	  	editBlog: '',
	  	selfIntro: 'active',
	  	admin: req.session.admin
	});
}