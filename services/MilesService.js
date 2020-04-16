const global = require('../util/Url');
const BASE_URL = global.BASE_URL;
const MILES_LIST = global.MILES_LIST;

class MilesService {
    constructor() {}

    listMiles = async (currentUser) => {
        let url = BASE_URL + MILES_LIST + currentUser;
        console.log(url)
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
export default MilesService;
