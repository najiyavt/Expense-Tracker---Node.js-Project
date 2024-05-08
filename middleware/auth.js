const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Expense = require('../models/expense')

const authenticate = async (req, res, next) => {
    try{
        const token=req.header('Authorization');
        console.log("token : ",token);
        const user=jwt.verify(token,'123456789');
        console.log('userid: ' , user.userId)
        
        User
            .findByPk(user.userId)
            .then((user)=>{
                req.user=user;
                next();
            });
    } catch(err){
        console.log(err);
        return res.status(401).json({success:false});
    }
}
module.exports  = {
authenticate
};