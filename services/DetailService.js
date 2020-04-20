const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class DetailService {
    constructor() {}

    getUserProgramMiles = async (user, cod_program) => {
        let url = BASE_URL + global.GET_MILES + user + "/" + cod_program;
        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                return false;
            });
      }
}
export default DetailService;
