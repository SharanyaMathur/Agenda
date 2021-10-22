const express = require('express');
const router = express.Router();
const Post = require('./models/Post');


router.get('/', async (req, res) => {
    try{
        const userr2 = await Post.find();
        res.json(userr2);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/', (req, res) => {
    const userr = new Post({
        name: req.body.name,
        email: req.body.email
    });

    userr.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({message: err});
    });

});

module.exports = router;