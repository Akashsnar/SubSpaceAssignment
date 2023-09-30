const _ = require('lodash');

const express = require('express');
const app = express();



const fetchblogquery = async (req, res, next) => {


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
        res.json(data.blogs);
    }


    const filteredBlogs = data.blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredBlogs);



    next()




    console.log(data);


}

module.exports = fetchblogquery;












// const _ = require('lodash');

// const express = require('express');
// const app = express();



// const fetchblogquery = async (req, res, next) => {

//     const options = {
//         method: 'GET',
//         headers: {
//             'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
//         }
//     };

//     const blogarray = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
//     .catch(err => console.error(err));
//     var data = await blogarray.json();
    


//     const query = req.query.query;
//     if (!query) {
//         res.json(data.blogs);
//         return;
//     }

    


//     const filteredBlogs = data.blogs.filter((blog) =>
//         blog.title.toLowerCase().includes(query.toLowerCase())
//     );


//     res.json(filteredBlogs);



//     next()




//     // console.log(data);


// }

// module.exports = fetchblogquery;