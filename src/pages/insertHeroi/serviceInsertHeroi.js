import CookieService from './../../util/CookieService';
import {CONFIG} from './../../config/config';

class ServiceInsertHeroi{

    findAllUniverso(){
        let token = CookieService.getCookie("token");

        return fetch(`${CONFIG.URL_DOMAIN}/universo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
    };

    findAllPoderes(){
        let token = CookieService.getCookie("token");

        return fetch(`${CONFIG.URL_DOMAIN}/poder`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
    };

    insertHeroi(heroiForm){
        let token = CookieService.getCookie("token");

        heroiForm.status = true;
        return fetch(`${CONFIG.URL_DOMAIN}/heroi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(heroiForm),
        });
        
    };
}

export default new ServiceInsertHeroi();