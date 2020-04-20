const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class DeleteMilesService {
    constructor() {}
    
    excludeMile = async (cod_milha, user, program) => {
        let url = BASE_URL + global.DELETE_MILE
          return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cod_milha: cod_milha, 
              user: user, 
              program: program
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
export default DeleteMilesService;
