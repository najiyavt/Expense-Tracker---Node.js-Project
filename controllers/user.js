const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next) => {

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt); //blowfish 
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({newUser,message:"Succesfully created user"});
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' })
    };
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.params;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingPassword = user.password;
        const comparedPassword = await bcrypt.compare(password, existingPassword);

        if (comparedPassword) {
            res.status(200).json({ success: true, message: 'User logged in successfully', token: generateToken(user.id, user.name) });
        } else {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function generateToken(id,name){
    return jwt.sign({userId:id , name: name} , 'secretkey');
}