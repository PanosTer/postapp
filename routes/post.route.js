const express = require('express');
const router = express.Router();

const { body, param, validationResult } = require('express-validator');
const postController = require('../controllers/post.controller');

const text_and_title_Validator = () =>{
  return[
    body('title').not().isEmpty().withMessage('The field is required'),
    body('title').isString().withMessage('Enter only letters'),
    body('text').not().isEmpty().withMessage('The field is required'),
    body('text').isString().withMessage('Enter only letters')
  ]
}

router.get('/', postController.findAll);
router.get('/:id', postController.findOne);

router.post('/', text_and_title_Validator(), (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
        status: false,
        data: errors.array()
    });  
  }
  next();
}, postController.create);

router.patch('/:id', postController.updatePost);
router.patch('/:id/category', postController.updateCategory);
router.delete('/:id', postController.deletePost);
router.delete('/:id/category', postController.deleteCategories);

module.exports = router;