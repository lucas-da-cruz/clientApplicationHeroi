import CookieService from './../../util/CookieService';
import {CONFIG} from './../../config/config';

class ServiceGetHeroi{

    getHeroi(id){
        let token = CookieService.getCookie("token");
        
        return fetch(`${CONFIG.URL_DOMAIN}/heroi/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };

}

export default new ServiceGetHeroi();