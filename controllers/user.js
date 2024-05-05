const User = require('../models/user');
const Expense = require('../models/expense');
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
        const comparedPassword = await bcrypt.compare(password,existingPassword)
            
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

exports.getExpense = async (req, res) => {
    try {
        const expense = await Expense.findAll();
        res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
}

exports.postExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create expense' });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        await expense.destroy();
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete expense' });
    }
}
