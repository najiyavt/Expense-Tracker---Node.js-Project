const Sequelize = require('sequelize');

const sequelize = new Sequelize('new_schema' , 'root' , 'najiyavt@2001', {
    dialect :'mysql',
    host:'localhost'
});

module.exports=sequelize;