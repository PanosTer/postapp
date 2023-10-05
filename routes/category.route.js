const express = require('express');
const router = express.Router();

const { body, param, validationResult } = require('express-validator');

const categoryController = require('../controllers/category.controller');

const idValidator = () =>{
  return[
    param('id').isNumeric().withMessage('Enter only number')
  ];
}

const updateValidator = () =>{
  return[
    param('id').isNumeric().withMessage('Enter only number'),
    body('id').isNumeric().withMessage('Enter only number'),
    body('id').not().isEmpty().withMessage('Field id is required'),
    body('name').isString().withMessage('Enter only letters'),
    body('name').not().isEmpty().withMessage('The field is required')
  ]
}

const nameValidator = () =>{
  return[
    body('name').not().isEmpty().withMessage('The field is required'),
    body('name').isString().withMessage('Enter only letters')
  ]
}

router.get('/', categoryController.findAll);
router.get('/:id', idValidator(), (req, res, next)=> {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      status: false, 
      data: errors.array()
    });
  }
  next();
}, categoryController.findOne);

router.post('/', nameValidator(), (req, res, next)=> {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
        status: false,
        data: errors.array()
    });  
  }
  next();
}, categoryController.create);

router.patch('/:id', updateValidator(), (req,res,next) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
        status: false,
        data: errors.array()
    });  
  }
  next();
}, categoryController.update);

router.delete('/:id', idValidator(), (req, res, next)=> {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
        status: false,
        data: errors.array()
    });  
  }
  next();
}, categoryController.delete);

module.exports = router;