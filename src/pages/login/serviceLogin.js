import {CONFIG} from './../../config/config';

class ServiceLogin{

    getToken(email, senha){
        var user = {
            email : email,
            senha : senha
        }
        
        return fetch(`${CONFIG.URL_DOMAIN}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
    };

    isAuthenticated(token){
        return fetch(`${CONFIG.URL_DOMAIN}/isAuthenticated`, {
            method: 'POST',
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        });
    };

    upServer(){
        return fetch(`${CONFIG.URL_DOMAIN}/upServer`, {
            method: 'GET'
        });
    };

}

export default new ServiceLogin();