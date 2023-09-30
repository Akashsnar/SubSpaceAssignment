const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors') 
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/blog-stats', require('./routes/blog_stats'))
app.use('/api/blog-search', require('./routes/blog_search'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});