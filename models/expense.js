const sequelize = require('../util/databse')
const Sequelize = require('sequelize')

const Expense = sequelize.define('Expense' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    }
})
module.exports=Expense;