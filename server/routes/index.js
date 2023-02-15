const express = require ('express');
const indexRouter = express.Router();

const Blog = require ('../models/Blogs');

/* GET home page. */
indexRouter.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
try {
  const allBlogs = await Blog.find({});
  res.json({blogs: allBlogs});
} catch (error) {
  console.log(error);
}
});

module.exports = indexRouter;
