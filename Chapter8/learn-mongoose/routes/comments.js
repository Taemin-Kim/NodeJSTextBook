var express = require('express');
var Comment = require('../schemas/comment');


var router = express.Router();



router.get('/:id', async(req, res, next) => {
    
    try {
        const comment = await Comment.find({commenter: req.params.id}).populate('commenter');
        console.log(comment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.post('/',  async(req, res, next) => {
    const comment = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    })
    console.log(comment);
    try {
        //밑에 작업은 Save와 polulate로 나누어도 된다
        const save_result = await comment.save();
        console.log('save_result :', save_result);
        const populate_result = await Comment.populate(save_result, { path: 'commenter' });
        console.log('populate_result :', populate_result);   
        res.status(201).json(populate_result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:id', async(req, res ,next) => {

    try {
        const result = await Comment.update({ _id: req.params.id}, {comment: req.body.comment});
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:id', async(req, res ,next) => {

    try {
        const result = await Comment.remove({ _id: req.params.id});
        res.json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;