async function submitForm(event) {
    event.preventDefault();
    const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
    };
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`http://localhost:8000/user/expense`, expenseDetails, { headers:{ "Authorization":token }});
        console.log(response.data);
        event.target.reset();
        alert('Expense added successfully');
        displayExpenses(response.data);
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

    deleteBtn.addEventListener('click', async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/user/expense/${expense.id}` , { headers:{"Authorization":token }});
            li.parentElement.removeChild(li);
            alert('Expense deleted successfully');
        } catch (error) {
            console.error('Deletion failed', error);
            alert('An error occurred while deleting the expense.');
        }
    });
}

document.addEventListener('DOMContentLoaded', async ()=> {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/user/expense' , {headers:{"Authorization":token}});
        console.log(response.data);
        response.data.forEach(expense => {
            displayExpenses(expense);
        });
    } catch (error) {
        console.log(error);
        alert('An error occurred. Please try again.');
    }
})
