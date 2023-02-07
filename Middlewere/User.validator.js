
    const express = require('express');
    const { check, validationResult } = require('express-validator');
    
    const validateInputs = [
      check('firstname').not().isEmpty().withMessage('First name is required'),
      check('lastname').not().isEmpty().withMessage('Last name is required'),
      check('email').isEmail().withMessage('Email is invalid'),
      check('pass').not().isEmpty().isLength({min:8,max:8}).withMessage('Password must be at least 8 characters long')
    ];
    
    const validate = (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      next();
    };
    
    module.exports = {validateInputs, validate};

