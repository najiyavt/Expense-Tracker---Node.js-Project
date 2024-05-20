
exports.getExpense = async (req,where) => {
    return req.user.getExpenses(where)
};
