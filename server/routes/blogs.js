const express = require ('express');
const blogRoutes = express.Router();
const { v4: uuidv4 } = require ("uuid");
uuidv4();

const Blog = require ('../models/Blogs');
// const dbCollection = "sample_blogs";

/* GET home page. */
blogRoutes.get('/all', async function(req, res) {

  //query blogs 
  try {
    const allBlogs = await Blog.find({});
    res.json({blogs: allBlogs });
  }catch(e){
    console.log(e);
  }
});

//add a new post
blogRoutes.post("/create-one", async (req, res, next) => {
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

// //Reusable function to find a single blog by id.
// async function findBlogById(req, res, next) {
//   let blog;
//   try {
//     blog = await dbo.getDb().collection(dbCollection)
//     .findOne({id: req.params.id});
//     if (blog == null) {
//       return res.status(404).json({message: "Blog not found"});
//     }
//   } catch (error) {
//       return res.status(500).json({message: error.message});
//   }
//   res.blog = blog;
//   next();
// }



// /* GET all existing bogs. */
// blogRoutes.route('/all').get(async function (req, res, next) {
//   try {
//     await dbo.getDb()
//     .collection(dbCollection)
//     .find({})
//     .limit(50)
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send('Error fetching blog entries!');
//       } else {
//         success: true,
//         res.json(result)
//       }
//     });
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })


// This section will pull a single record, using the a static id paramter.
// blogRoutes.route('/getOne/').get(async function (req, res, next){
//   try {
//     await dbo.getDb()
//     .collection(dbCollection)
//     .find({id: "01ed79b1-75c2-44e5-becb-10788158a7db"})
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send('Error fetching blog entries!');
//       } else {
//         success: true,
//         res.json(result)
//       }
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// This section will pull a single record, using the a dynamic id paramter.
// blogRoutes.get('/getOne/:id', findBlogById, (req, res, next) => {
//   res.send(res.blog);
// });



// This section will help you delete a record.
// blogRoutes.delete('/deleteOne/:id', findBlogById, (req, res, next) => {
//   try {
  
//     if (res.blog === true ){
//       console.log("blog exists");
//     }
    // await dbo.getDb()
    // .collection(dbCollection)
    // .deleteOne({id: req.params.id}, (err , collection) => {
    //   if(err) throw err;
    //   console.log(" Blog record not found");
    // });
    // res.json({ message: "Blog removed!" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

  // This section will help you create a new record.
// blogRoutes.route('/createNew').post(async function (req, res, next) {
  
  // const newBlogEntry = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   text: req.body.text,
  //   categories: req.body.categories,
  //   id: uuidv4(),
  //   createdAt: new Date(),
  //   lastModified: new Date() 
  // };
  //   try {
  //     await dbo.getDb()
//       .collection(dbCollection)
//       .insertOne(newBlogEntry);
//       res.json({ message: "New Blog Inserted!" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// });

// This section will help you retrieve multiple records and sort them.
// blogRoutes.route('/getManyStatic').get(async function (req, res, next) {
//   const dbConnect = await dbo.getDb()
//   .collection(dbCollection)
//   .find({id: req.params.idToFind}, function (err, result) { 
//     if (err) {
//       res.status(400).send('Error fetching blog entries!');
//     } else {
//       success: true,
//       res.json(result)
//     }
//   });
// })






// This section will help you update a record by id.
// blogRoutes.route('/listings/updateLike').post(function (req, res, next) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection(dbCollection)
//     .updateOne(listingQuery, updates, function (err, res, next) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//         res.status(200).send('1 document updated');
//       }
//     });
// });
    
// This section will help you delete a record.
// blogRoutes.route('/listings/delete/:id').delete((req, res, next) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

// dbConnect
//   .collection(dbCollection)
//   .deleteOne(listingQuery, function (err, res, next) {
//     if (err) {
//       res
//       .status(400)
//       .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//     } else {
//       console.log('1 document deleted');
//       }
//   });
// })


module.exports = blogRoutes;