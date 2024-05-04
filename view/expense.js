async function submitForm(event){
    event.preventDefault();
    const expenseDetails = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value,
    }
    try{
        const response = await axios.post(`http://localhost:8000/user/expense`, expenseDetails)
        console.log(response.data);
        event.target.reset();
        alert('expense added succesfully')
    }catch(error){
        console.log(error);
        alert('An error occurred. Please try again. ')
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    try{
        const response = await axios.get('http://localhost:8000/user/expense');
        console.log(response.data);
        response.data.forEach(expense => {
            displayExpenses(expense);
       });
    }  
})

function displayExpenses(expense) {
    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category} `;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);


    deleteBtn.addEventListener('click', async () => {
        try {
            await axios.delete(`http://localhost:8000/user/expense/${expense.id}`);
            expenseList.removeChild(li);
            alert('Expense deleted successfully');
        } catch (error) {
            console.error('Deletion failed', error);
            alert('An error occurred while deleting the expense.');
        }
    });
}