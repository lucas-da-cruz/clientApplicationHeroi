import {CONFIG} from './../../config/config';

class ServiceLogin{

    insertUser(user){
       
        return fetch(`${CONFIG.URL_DOMAIN}/usuarioAdmin`, {
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

}

export default new ServiceLogin();