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
})

//add a new post
indexRouter.post("/create-one", async (req, res, next) => {
  try {
    //parse out fields from post request
    const title = req.body.title;
    const author = req.body.author;
    const text = req.body.text;
    const categories = req.body.categories;
  
    //pass fields to model
    const newBlogEntry = new Blog({
      title,
      author,
      text,
      categories
    });

    //save to database
    const savedData = await newBlogEntry.save();

    //return the successful request to the user
    res.json({
      success: true,
      blogs: savedData
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = indexRouter;
