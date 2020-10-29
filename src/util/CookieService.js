class CookieService{

    getCookie(nomeToken) {
        var nome = nomeToken + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(nome) === 0) {
            return c.substring(nome.length, c.length);
          }
        }
        
        return "";
    };
    
}

export default new CookieService();