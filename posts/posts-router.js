const router = require('express').Router();
const Posts = require('../data/db.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error retrieving the posts'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(200).json({message: 'Post not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error retrieving the posts'
            });
        });
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(200).json({message: 'Post not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error retrieving the posts'
            });
        });
});

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(200).json({message: 'Post not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error retrieving the posts'
            });
        });
});



module.exports = router;