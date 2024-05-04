async function submitForm(event) { 
    event.preventDefault();
    const userDetails = {
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    try {
        const response= await axios.post(`http://localhost:8000/user/signup`,userDetails);
        event.target.reset();
    }
    catch(error){
        console.log(error);
    }
}
