const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/databse');

exports.getExpense = async (req, res) => {
    const { page = 1, limit = 5 } = req.query; // Get page and limit from query params, with defaults

    try {
        const expenses = await Expense.findAndCountAll({
            where: { UserId: req.user.id },
            limit: parseInt(limit), // Number of items per page
            offset: (page - 1) * limit // Offset based on current page
        });

        res.status(200).json({
            expenses: expenses.rows,
            currentPage: page,
            totalItems: expenses.count,
            totalPages: Math.ceil(expenses.count / limit),
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
}

exports.postExpense = async (req, res) => {
    const t = await sequelize.transaction(); //transaction concept imp
    const { amount, description, category } = req.body;
    
    try {
        const expense = await Expense.create({
            amount, 
            description, 
            category, 
            UserId: req.user.id 
        },{
            transaction: t
        });
        const user = await User.findByPk(req.user.id);
        
        const total = user.totalCost + parseInt(amount);
        await user.update({ totalCost: total } , { transaction:t });

        await t.commit();

        res.status(201).json({ expense, success: true });
        
    } catch (error) {
        await t.rollback();
        console.error('Error creating expense:', error);
        res.status(500).json({success:false, error: 'Failed to create expense' });
    }
}

exports.deleteExpense = async (req, res) => {
     const expenseId = req.params.expenseId;
    if(expenseId === undefined || expenseId === 0){
        return res.status(400).json({success:false})
    }
    const t = await sequelize.transaction(); //transaction concept imp
    try { 
        const currentExpense = await Expense.findByPk(expenseId);
        if (!currentExpense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
        await currentExpense.destroy();
        
        const user = await User.findByPk(req.user.id);
        const total = user.totalCost - currentExpense.amount;
        await user.update({ 
            totalCost: total } , { transaction:t 
        });
        await t.commit();
        res.status(200).json({success:true,message:"Deleted succesfully"});
    } catch (error) {
        await t.rollback();
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
}
