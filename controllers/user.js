const User = require('../models/user');

exports.postSignup = async (req,res,next) => {

    try{
        const { name, email, password } = req.body;
        const newUser = await User.create({
            name:name,
            email:email, 
            password:password 
        })
        res.status(201).json(newUser);
        con
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Signup failed' })
    };
}
