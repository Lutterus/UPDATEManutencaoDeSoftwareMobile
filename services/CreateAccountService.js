const global = require('../util/Url');
const BASE_URL = global.BASE_URL;
const ADD_USER = global.ADD_USER;

class CreateAccountService {
    constructor() {}
    
      addUser = async (useremail, usernome, usertelefone, usersenha) =>{
        let url = BASE_URL + ADD_USER
          return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: useremail,
                nome: usernome,
                telefone: usertelefone,
                senha: usersenha
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
export default CreateAccountService;
