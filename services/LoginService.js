const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class LoginService {
    constructor() {}
    
  login = async (login, password) =>{
    let url = BASE_URL + global.LOGIN
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: login,
          password: password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false
      });
  }

}
export default LoginService;
