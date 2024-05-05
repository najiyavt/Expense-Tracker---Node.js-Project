const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user');

router.post('/signup',controllers.postSignup);
router.get('/login/:email/:password',controllers.getLogin);
router.post('/expense',controllers.postExpense);
router.get('/expense' , controllers.getExpense);
router.delete('/expense/:id', controllers.deleteExpense);

module.exports=router;