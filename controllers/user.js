const User = require('../models/user');

exports.postSignup = async (req,res,next) => {

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
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

exports.getLogin = async(req, res, next) => {
    try{
        const  { email , password } = req.params;

        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }

        const existingPassword = user.password;
        if(existingPassword !== password) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        res.status(200).json({ message: 'Login successfull' });
     } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    };
}
