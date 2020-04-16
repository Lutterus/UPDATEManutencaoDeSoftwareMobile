const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class ProgramService {
    constructor() {}
    
    addProgram(programName, accountLogin, quantity, dtExpiratio) {
    let url = BASE_URL + global.ADD_MILE
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            program: programName,
            user: accountLogin,
            miles: quantity,
            expirationDate: dtExpiratio
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
export default ProgramService;
