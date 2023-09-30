const _ = require('lodash');




const fetchblogdata=(req, res, next)=>{

    // console.log(_);
    const options = {
        method: 'GET',
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
      };
      
      fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
        .then(response => response.json())
        .then(response => res.json({ TotalBlogs: _.size(response.blogs),
            LongestTitleBlog: _.maxBy(response.blogs, _.property('title.length')),
            ContainPrivacy: _.size(_.filter(response.blogs, (item) => _.includes(item.title.toLowerCase(), 'privacy'))),
            UniqueTitles: _.uniqBy(_.map(response.blogs, 'title'))
        }),
         next()
        )
        .catch(err => console.error(err));



}

module.exports = fetchblogdata;