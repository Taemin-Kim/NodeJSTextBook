
const express = require('express');
const { User, Comment } = require('../models');

var router = express.Router();

router.get(':/id', async(req, res, next) => {
    try {
        const comment = await Comment.findAll({
            include: {
                model: User,
                where: {id: req.params.id },
            }
        });
        console.log(comment);
        res.json(comment);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
          });
        console.log(comment);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error); 
    }
})

router.patch('/:id', async(req, res, next) => {
    
    try{
    const comment = await Comment.update({ comment: req.body.comment}, {where: {id:req.params.id}});
    console.log(comment);
    res.json(comment);
    }catch(error){
        console.error(error);
        next(error)
    }

});

router.delete('/:id', async(req, res, next) => {
    try {
        const comment = await Comment.destroy({ where : {id: req.params.id} });
        console.log(comment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        next(error)
    }
});

module.exports = router;