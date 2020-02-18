import Axios from "axios";
const baseUrl = "http://localhost:8080"
const getJwt = () => localStorage.getItem("jwt")? localStorage.getItem("jwt") : null;
export async function postData(url = '', data = {}, isJwtValid) {
    let config = null;
    const jwtToken = await getJwt();
    const AuthStr = "Bearer ".concat(jwtToken);
    if (isJwtValid){
        config = {headers : { Authorization: AuthStr } }
    }
    const newUrl = baseUrl + url;
    return Axios.post(newUrl, data, config)
    .then(
        response=>response,
        err => {throw err;}
    )
    .catch(
        error => error
    );
  }

  export async function getData(url = '', isJwtValid) {
    let config = null;
    const jwtToken = await getJwt();
    const AuthStr = "Bearer ".concat(jwtToken);
    console.log(AuthStr)
    if (isJwtValid){
        config = {headers : { Authorization: AuthStr,}}
    }
    const newUrl = baseUrl + url;
    return Axios.get(newUrl, config)
    .then(
        response=>response,
        err => {throw err;}
    )
    .catch(
        error => error
    );
  }