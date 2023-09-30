const express = require('express');
const router = express.Router();
const _ = require('lodash');
var fetchblogdata = require('../middleware/fetchblogdata');




async function performSearch(req, res, next) {
    // console.log(_);
    const options = {
        method: 'GET',
        headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
    };

    var response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
        .catch(err => console.error(err));

    response = await response.json();


    response = {
        TotalBlogs: _.size(response.blogs),
        LongestTitleBlog: _.maxBy(response.blogs, _.property('title.length')),
        ContainPrivacy: _.size(_.filter(response.blogs, (item) => _.includes(item.title.toLowerCase(), 'privacy'))),
        UniqueTitles: _.uniqBy(_.map(response.blogs, 'title'))
    }

    return response;

}


//cached data stored for 1 minute
//Query = req.query.query
// perform search middleware


const memoizedAnaylsis = _.memoize(performSearch, (req) => req.query.query || 'After', { maxAge: 60000 });






router.get('/', async (req, res) => {

    console.log("Blog-Stats max caching period: 60 second");

    try {
        const Result = await memoizedAnaylsis(req);
        res.json(Result);
    } catch (error) {
        res.send("error occured");
        
    }



})


module.exports = router

