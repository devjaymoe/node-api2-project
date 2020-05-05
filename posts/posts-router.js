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
        .then(post => {
            if (post) {

                Posts.remove(req.params.id)
                .then(response => {
                    res.status(200).json(post)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: 'there was an error deleting the posts'
                    });
                });

            } else if (!post) {
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

router.post('/', (req, res) => {
    
    Posts.insert(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error Adding the post'
            });
        });
});

router.post('/:id/comments', (req, res) => {

    Posts.findPostComments(req.params.id)
        .then(posts => {
            if (posts) {
                Posts.insertComment(req.body)
                .then(response => {
                    res.status(201).json(response)
                })
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

router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
        .then( response => {
            console.log(response)
            Posts.findById(req.params.id)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(error => {
                    console.log(error)
                    res.status(200).json({
                        message: 'there was an error finding the post id'
                    });
                });
        })
        .catch( error => {
            console.log(error)
            res.status(404).json({ message: 'post not found'});
        });
});


module.exports = router;