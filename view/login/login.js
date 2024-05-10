document.addEventListener('DOMContentLoaded', function() {
    const loginMsg = document.getElementById('loginMsg');

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.get(`http://localhost:8000/user/login/${email}/${password}` );
            console.log(response);
            // if (response.status === 200) {
               // loginMsg.textContent = response.data.message; 
                localStorage.setItem('token' , response.data.token);
                alert("Logged succesful");
                window.location.href='../expense/expense.html';
            //}
        } catch (error) {
            console.error( error);
            //console.error( JSON.stringify(error.response.data.error));
           // loginMsg.innerHTML='<div style="color:red">${error.response.data.error}</div>'
            if (error.response && error.response.status === 404) {
                loginMsg.textContent = 'Invalid email. Please try again.';
            } else if (error.response && error.response.status === 401) {
                loginMsg.textContent = 'User not authorized.';
            } else {
                loginMsg.textContent = 'An error occurred. Please try again.';
            }
            alert('An error occurred. Please try again.');
        }
    });
});