const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class DefaultProgramService {
    constructor() {}

    getDefaultPrograms = async () => {
        let url = BASE_URL + global.PROGRAMS_LIST
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
export default DefaultProgramService;
