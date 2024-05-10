const sequelize = require('../util/databse')
const Sequelize = require('sequelize')

const User = sequelize.define('User' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isPremiumUser :{
      type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})
module.exports=User;