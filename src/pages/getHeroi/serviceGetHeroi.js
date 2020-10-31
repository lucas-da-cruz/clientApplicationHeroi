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

    updateHeroi(id, data){
        let token = CookieService.getCookie("token");

        var heroiForm = {
            nome : data.nome,
            universo : data.universo,
            poder : data.poder,
            status : true
        }

        console.log(JSON.stringify(heroiForm));
        
        return fetch(`${CONFIG.URL_DOMAIN}/heroi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(heroiForm),
        });
    };

}

export default new ServiceGetHeroi();