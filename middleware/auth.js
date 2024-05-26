const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try{
        const token=req.header('Authorization');
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        const userDetails = await User.findByPk(decoded.userId);

        if (!userDetails) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user=userDetails;
        next();
    } catch(err){
        console.error("Authentication error:", err);
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
}
module.exports  = {
authenticate
};