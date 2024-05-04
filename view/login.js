document.addEventListener('DOMContentLoaded', function() {
    const loginMsg = document.getElementById('loginMsg');

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.get(`http://localhost:8000/user/login/${email}/${password}`);
            console.log(response);
            if (response.status === 200) {
                loginMsg.textContent = response.data.message;
            } else {
                if (response.status === 401) {
                    loginMsg.textContent = 'Incorrect password';
                } else if (response.status === 404) {
                    loginMsg.textContent = 'User not found';
                } else {
                    loginMsg.textContent = 'An error occurred. Please try again.';
                }
            }
        } catch (error) {
            console.error( error);
            loginMsg.textContent = 'An error occurred. Please try again.';
        }
    });
});