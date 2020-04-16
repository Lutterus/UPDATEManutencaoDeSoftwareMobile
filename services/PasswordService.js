const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class PasswordService {
    constructor() {}
    
    resetPassword = async (emailUser) =>{
    let url = BASE_URL + global.RESET_PASSWORD
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailUser
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
export default PasswordService;
