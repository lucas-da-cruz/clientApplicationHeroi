class ServiceLogin{

    getToken(email, senha){
        var user = {
            email : email,
            senha : senha
        }
        
        return fetch('http://localhost:8080/auth', {
        //return fetch('https://back-end-3cs.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
    };

    isAuthenticated(token){
        console.log(`Bearer ${token}`);
        //return fetch('http://localhost:8080/isAuthenticated', {
        return fetch('https://back-end-3cs.herokuapp.com/isAuthenticated', {
            method: 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        });
    };

}

export default new ServiceLogin();