const sequelize = require('../util/databse')
const Sequelize = require('sequelize')

const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests' , {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultKey:Sequelize.uuidv4,
      },
      isActive: Sequelize.BOOLEAN
})
module.exports=ForgotPasswordRequests;