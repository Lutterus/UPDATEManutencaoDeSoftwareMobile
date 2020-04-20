const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class GetMileService {
    constructor() {}

    getMile = async (cod_milha, user) => {
        let url = BASE_URL + global.GET_MILE + user + "/" + cod_milha;
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
export default GetMileService;
