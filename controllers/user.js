const User = require('../models/user');

exports.postSignup = async (req,res,next) => {

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
            alert('The email address you entered is already in use.')
        }
        const newUser = await User.create({
            name:name,
            email:email, 
            password:password 
        })
        res.status(201).json(newUser);
        
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Signup failed' })
    };
}
