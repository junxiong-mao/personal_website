var express = require('express');
var home = require('./controllers/home');
var category = require('./controllers/category');
var article = require('./controllers/article');
var sign = require('./controllers/sign');
var edit = require('./controllers/edit');
var contact = require('./controllers/contact');
var comment = require('./controllers/comment');
var selfIntro = require('./controllers/self-intro');
var webInfo = require('./middlewares/webInfo');
var articleMidware = require('./middlewares/articleMidware');


var router = express.Router();

/* GET home page. */
router.get('/', home.index);
router.get('/blogs', home.index);

router.get('/blogs/:category', category.index);

router.get('/blogs/article/:blogId', articleMidware.readingNumber, article.index);
router.post('/like-article/:blogId', articleMidware.likeNumber);
router.post('/remove-article/:blogId', article.removeArticle);
router.post('/remove-article-red/:blogId', article.removeArticleRed);

router.get('/edit', edit.createNew);
router.post('/post-blog', edit.postNew);
router.get('/edit/:blogId', edit.edit);
router.post('/edit-blog/:blogId', edit.postEdit);

router.post('/post-blog-comment/:blogId/:parentId', comment.postBlogComment);
router.post('/remove-comment/:commentId', comment.removeBlogComment);

router.get('/contact', contact.index);
router.post('/contact/post-message/:replyId', contact.postMessage);
router.post('/remove-message/:messageId', contact.removeMessage);

router.get('/self-intro', selfIntro.index);

router.get('/no-admin', function(req, res, next)
{
	res.render('no-admin');
})

router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.get('/logout', sign.logout);

router.post('/visitorNumber', webInfo.visitorNum);

module.exports = router;
