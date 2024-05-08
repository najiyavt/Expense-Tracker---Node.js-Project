const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');
const userAuth = require('../middleware/auth');

router.post('/signup', userController.postSignup);

router.get('/login/:email/:password', userController.getLogin);

router.post('/expense', userAuth.authenticate, expenseController.postExpense);

router.get('/expense', userAuth.authenticate, expenseController.getExpense);

router.delete('/expense/:expenseId', userAuth.authenticate, expenseController.deleteExpense);

module.exports = router;
