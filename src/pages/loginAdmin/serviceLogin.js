class ServiceLogin{

    getToken(email, senha){
        var user = {
            email : email,
            senha : senha
        }
        console.log(user.email);
        console.log(user.senha);
        return fetch('https://back-end-3cs.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
    };

}

export default new ServiceLogin();