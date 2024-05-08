const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/databse');
const routes = require('./routes/admin');
const User = require('./models/user');
const Expense = require('./models/expense');

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/user' , routes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
   .sync()
   .then(result => {
      app.listen(8000 , () => console.log('8000 started working'));
   })
   .catch(err => console.log(err));