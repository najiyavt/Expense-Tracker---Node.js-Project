const express = require('express');

const controllers = require('../controllers/user');

const router = express.Router();

router.post('/signup',controllers.postSignup);
//router.get('/signup',controllers.getSignup)

module.exports=router;