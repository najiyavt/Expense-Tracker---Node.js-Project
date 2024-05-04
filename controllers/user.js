const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postSignup = async (req,res,next) => {

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    

    // bcrypt.hash(password,10,async(err,hash)=>{
    //     console.log(err);
    //     const newUser = await User.create({ name, email, password:hash});
    //     res.status(201).json(newUser);
    // })
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' })
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

        const comparedPassword = bcrypt.compare(password,existingPassword)
            
        if(comparedPassword){
            res.status(200).json({  message: 'User Logged in successfull' });
        }else{
            return res.status(401).json({ message: 'User not authorized' });
        }
         
     } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    };
}
