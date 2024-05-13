const Expense = require('../models/expense');
const User = require('../models/user')

exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
}

exports.postExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    
    try {
        const expense = await Expense.create({ amount, description, category, UserId: req.user.id });
        const user = await User.findByPk(req.user.id);
        const total = user.totalCost + parseInt(amount);
        await user.update({ totalCost: total });
        res.status(201).json({ expense, success: true });
        console.log(total);
        console.log(expense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({success:false, error: 'Failed to create expense' });
    }
}

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.expenseId;
    try {
        if(expenseId === undefined || expenseId === 0){
            return res.status(400).json({success:false})
        } 
        const currentExpense = await Expense.findByPk(expenseId);
        if (!currentExpense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
        await currentExpense.destroy();
        
        const user = await User.findByPk(req.user.id);
        const total = user.totalCost - currentExpense.amount;
        await user.update({ totalCost: total });
        
        res.status(200).json({success:true,message:"Deleted succesfully"});
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
}
