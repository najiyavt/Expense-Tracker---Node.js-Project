const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const sequelize = require('./util/databse');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const leaderBoardRoutes = require('./routes/leaderboardRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');


const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPasswordRequests = require('./models/ForgotPasswordRequests');
const DownloadedFiles = require('./models/downloadedFiles')

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use('/user' , userRoutes);
app.use('/expense' , expenseRoutes);
app.use('/purchase' , purchaseRoutes);
app.use('/premium' , leaderBoardRoutes);
app.use('/password' , forgotPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);  

User.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(User);


sequelize
   .sync()
   .then(result => {
      app.listen(8000 , () => console.log('8000 started working'));
   })
   .catch(err => console.log(err));