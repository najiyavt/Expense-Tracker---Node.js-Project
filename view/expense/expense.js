async function submitForm(event) {
    event.preventDefault();
    const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
    };
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`http://localhost:8000/expense/addExpense`,
            expenseDetails, {
            headers:{ "Authorization":token }
        });
        console.log(response.data.expense);
        event.target.reset();
        alert('Expense added successfully');
        displayExpenses(response.data.expense);
    } catch (error) {
        console.log(error);
        alert('An error occurred. Please try again. ')
    }
};


async function displayExpenses(expense) {
    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.textContent = `${expense.amount} - ${expense.description} - ${expense.category} - `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.classList.add('deleteBtn');

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    deleteBtn.onclick= async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/expense/${expense.id}` , {
                headers : {"Authorization":token }
            });
            li.parentElement.removeChild(li);
            alert('Expense deleted successfully');
        } catch (error) {
            console.error('Deletion failed', error);
            alert('An error occurred while deleting the expense.');
        }
    }
}

document.addEventListener('DOMContentLoaded', async ()=> {
    try {
        const token = localStorage.getItem('token');

        const expenseRes = await axios.get('http://localhost:8000/expense/getExpense', {
            headers:{"Authorization":token}
        });
        const expenses = expenseRes.data;

        console.log('expenses>>>>>>>>>>',expenses);
        
        expenses.forEach(expense => {
            displayExpenses(expense);
        });
    } catch (error) {
        console.log('Error fetching data:', error);
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('premium').onclick = async function( event) {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.get(`http://localhost:8000/purchase/premiumPurchase` ,{
            headers : { 'Authorization' : token }
        });
        console.log(response.data);

        var options = {
           'key':response.data.key_id, //key id generated frm dashboard
           'order_id':response.data.order.id, //for onetime paymnt
           //handler fn handle success paymnt
           'handler': async function(response) {
            try{
                await axios.post(`http://localhost:8000/purchase/updateTransactionStatus` , {
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                }, {
                headers: {'Authorization' : token}
            });
            displayPremiumStatus(true);
            alert(' Congratulations! You are now a Premium User. ');    

            }catch(error){
                console.error('Error while updating transaction status:', error);
                alert('An error occurred while updating transaction status.');
                displayPremiumStatus()
            }
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();

    rzp1.on('payment.failed' , async function (response) {
        try{
            console.log(response);
            // await axios.post('http://localhost:8000/purchase/updateOrderStatus' , {
            //     order_id:options.order_id,
            // }, {
            // headers : { 'Authorization': token }
            // });
            alert('Payment failed. Order status has been updated.')
        }catch(error){
            console.log('Error updating order status:', error);
            alert('An error occurred while updating order status.');
        }
    })
    }catch(error){
        console.error('Error initiating premium purchase:', error);
        alert('An error occurred while initiating premium purchase.');
    }
}

function displayPremiumStatus(isPremium){
    if(isPremium){
        document.getElementById('premium').style.display='none';
        document.getElementById('success').innerHTML=' Premium User ';        
    }
}

document.getElementById('leaderButton').onclick = async function( event) {
    try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/premium/showLeaderBoard`,{
                headers : { 'Authorization': token }
            });
            const resData = response.data;
            console.log('resData>>>>>>>>>>>>>>>>' , resData)
            const leaderBoard = document.getElementById('leaderBoard');
            leaderBoard.innerHTML=''
            resData.forEach(user => {
                const li = document.createElement('li')
                li.innerHTML += `Name - ${user.name} , Total expense - ${user.totalCost}`;
                leaderBoard.appendChild(li)
            })
            //document.getElementById('leaderMessage').style.display='block'
    }catch(error){
        console.log(error)
    }
}