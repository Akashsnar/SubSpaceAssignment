const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fetchblogquery = require('../middleware/fetchblogquery');
const fetchblogdata =require('../middleware/fetchblogdata')


async function performSearch(req, res, next) {
    const options = {
        method: 'GET',
        headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
    };

    const blogarray = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
    .catch(err => console.error(err));
    var data = await blogarray.json();
    
    const query = req.query.query;
    if (!query) {
      
        return data.blogs;
    }

// use filter for search in  cas in senstive

    const filteredBlogs = data.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
    );
//next()
return filteredBlogs;

  }


//cached data stored for 1 minute
//Query = req.query.query
// perform search middleware


const memoizedSearch = _.memoize(performSearch, (req) => req.query.query || 'After', { maxAge: 60000 });




router.get('/', async(req, res, next)=>{
console.log('Blog-search (search titles contains specific substring) max caching period: 60 second');
try {
    const searchResult = await memoizedSearch(req);
    res.json({ Blogs: searchResult });
} catch (error) {
    res.send("error occured");
    
}
   

  
})



module.exports = router

