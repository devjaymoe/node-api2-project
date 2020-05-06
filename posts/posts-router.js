const router = require('express').Router();
const Posts = require('../data/db.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            console.log(posts)
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be retrieved.'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            console.log(posts)
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
    const blogPost = req.body
    
    if (blogPost.title && blogPost.contents) {

        Posts.insert(blogPost)
            .then(response => {
                const newId = response.id
                return newId
            })
            .then(newId =>{

                Posts.findById(newId)
                    .then(post => {
                        res.status(201).json(post)
                    })
                    .catch(error => console.log(error))

            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    message: 'There was an error while saving the post to the database'
                });
            });

    } else {

        res.status(400).json({
            message: "Please provide a title and content to the post"
        })

    }

});

router.post('/:id/comments', (req, res) => {
    const id = req.params.id
    const commentReq = req.body

    Posts.findPostComments(id)
        .then(comment => {

            const [commentObj] = comment

            if (commentObj) {

                if (commentReq.text && typeof commentReq.text === 'string'){

                    Posts.insertComment(commentReq)
                    .then(newId => {
                        const DummyThickId = newId.id
                        return DummyThickId
                    })
                    .then(DummyThickId => {

                        Posts.findCommentById(DummyThickId)
                            .then(comment => {

                                res.status(201).json(comment)
                            })
                            .catch(err => {

                                res.status(201).json({ 
                                    error: 'Couldnt find comment'
                                })

                            })

                    })
                    .catch( err => {
                        console.log(err)
                        res.status(500).json({
                            error: "There was an error while saving the comment to the database"
                        })
                    })

                } else {
                    
                    res.status(400).json({
                        message: 'Please provide text for the comment.'
                    })

                }
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist.'})
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