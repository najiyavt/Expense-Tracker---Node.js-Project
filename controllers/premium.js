const User = require('../models/user');
const Expense = require('../models/expense');

exports.showLeaderBoard = async (req, res) => {
    try {
        const users = await User.findAll();
        const expenses = await Expense.findAll();

        const userExpenses = {};
        expenses.forEach(expense => {
            const userId = expense.userId;
            if (userExpenses[userId]) {
                userExpenses[userId] += expense.amount;
            } else {
                userExpenses[userId] = expense.amount;
            }
        });

        console.log('User expenses:', userExpenses); 

        const userLeaderBoard = [];

        users.forEach(user => {
            userLeaderBoard.push({
                name: user.name,
                totalCost: userExpenses[user.id] || 0
            });
        });

        userLeaderBoard.sort((a, b) => b.totalCost - a.totalCost);

        console.log('User leaderboard:', userLeaderBoard); // Log user leaderboard

        res.status(200).json(userLeaderBoard);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
