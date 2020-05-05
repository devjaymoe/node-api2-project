const express = require('express');

const postRouter = require('./posts/posts-router'); 

const server = express();

server.use(express.json());
server.use('/posts', postRouter);


server.get('/', (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.listen(4000, () => {
  console.log('Magic is happening on Port 4000');
});
