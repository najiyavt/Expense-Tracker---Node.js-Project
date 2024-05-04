const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user');

router.post('/signup',controllers.postSignup);
router.get('/login/:email/:password',controllers.getLogin)

module.exports=router;