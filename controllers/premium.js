const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/databse');

exports.showLeaderBoard = async (req, res) => {
    try{
        const aggriExpense = await User.findAll({attributes:['name','totalCost']});
        console.log('aggriExpense>>>>>>>>>>>>' ,aggriExpense)
        // const userLeaderBoard = await User.findAll({
        //     attributes: [ 'id', 'name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'totalCost'] ],
        //     include: [ { model: Expense, attributes: [] }],
        //     group: ['user.id'],  order: [['totalCost', 'DESC']] 
        // });
        res.status(200).json(aggriExpense);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    };
};
