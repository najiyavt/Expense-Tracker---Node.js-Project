const express = require('express');
const router = express.Router();

const premiumController = require('../controllers/leaderboard');
const userAuth = require('../middleware/auth');

router.get('/showLeaderBoard' , userAuth.authenticate, premiumController.showLeaderBoard)

module.exports=router;