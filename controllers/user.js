const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/userServices');
const S3services = require('../services/S3services');
const DownloadedFiles = require('../models/downloadedFiles');
const sequelize = require('sequelize');

exports.downloadExpense = async(req,res) => {
    try{
        const isPremiumUser = req.user.isPremiumUser;
        if(isPremiumUser){
            const expenses =  await UserServices.getExpense(req);
    
            const stringifiedExpenses = JSON.stringify(expenses);
            
            const filename = `Expense${req.user.id}/${new Date()}.txt`;
            const fileURL = await S3services.uploadToS3(stringifiedExpenses , filename );
           
            await DownloadedFiles.create({url:fileURL.Location , UserId:req.user.id})
            
            res.status(200).json(fileURL);
        }else{
            res.status(401).json({success:false , message: "Unauthorized : you are not a premium user"})
        }
    }catch(err){
        console.log('Error fetching:',err)
        res.status(500).json({fileURL: '' , error:'Failed to fetch',success:false ,err:err})
    }
}

exports.downloadRecords = async (req,res ) => {
    try{
        const isPremiumUser = req.user.isPremiumUser;
        if(isPremiumUser){
            const downloadRecoards = await DownloadedFiles.findAll({where: {UserId:req.user.id}});
            res.status(201).json(downloadRecoards)
        }else{
            res.status(401).json({ success: false, message: "Unauthorized : you are not a premium user" });
        }
    }catch(err) {
        console.error('Error fetching:', err);
        res.status(500).json({ error: 'Failed to fetch' ,err:err});
    };
}

exports.signup = async (req,res ) => {

    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt); //blowfish 
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(200).json({newUser,message:"Succesfully created user"});
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' })
    };
}

exports.login = async (req, res) => {
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
    return jwt.sign({userId:id , name: name} , process.env.JWT_SECRET);
}