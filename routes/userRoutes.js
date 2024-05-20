const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userAuth = require('../middleware/auth')

router.post('/signup', userController.signup);
router.get('/login/:email/:password', userController.login);
router.get('/download' , userAuth.authenticate , userController.downloadExpense);
//router.get('/downloadRecords' , userAuth.authenticate , userController.downloadRecords);

module.exports = router;
