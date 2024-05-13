const express = require('express');
const router = express.Router();

const passwordController = require('../controllers/forgotPassword');

router.post('/forgotpassword' ,  passwordController.forgotpassword)

module.exports=router;