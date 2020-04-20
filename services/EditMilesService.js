const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class EditMilesService {
    constructor() {}
    
    editMile = async (cod_milha, user, quantidade, dt_expiracao, program) => {
        let url = BASE_URL + global.EDIT_MILE
          return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_milha: cod_milha,
                user: user,
                quantidade: quantidade,
                dt_expiracao: dt_expiracao,
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
export default EditMilesService;
