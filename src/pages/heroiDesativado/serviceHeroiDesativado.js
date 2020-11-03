import CookieService from './../../util/CookieService';
import {CONFIG} from './../../config/config';

class ServiceHeroiDesativado{

    findAllHeroisDesativado(){
        let token = CookieService.getCookie("token");

        return fetch(`${CONFIG.URL_DOMAIN}/heroi?status=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
    };
    
    alteraStatus(id){
        let token = CookieService.getCookie("token");

        return fetch(`${CONFIG.URL_DOMAIN}/heroi/alteraStatus/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
    };
}

export default new ServiceHeroiDesativado();