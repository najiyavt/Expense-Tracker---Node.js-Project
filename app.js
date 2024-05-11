const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const sequelize = require('./util/databse');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use('/user' , userRoutes);
app.use('/expense' , expenseRoutes);
app.use('/purchase' , purchaseRoutes);
app.use('/premium' , premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User)

sequelize
   .sync()
   .then(result => {
      app.listen(8000 , () => console.log('8000 started working'));
   })
   .catch(err => console.log(err));