const express = require('express');

const controllers = require('../controllers/user');

const router = express.Router();

router.post('/signup',controllers.postSignup);
router.get('/login/:email/:password',controllers.getLogin)

module.exports=router;