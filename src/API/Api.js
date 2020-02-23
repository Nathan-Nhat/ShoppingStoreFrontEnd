import Axios from "axios";
const baseUrl = "http://localhost:8080"
const getJwt = () => localStorage.getItem("jwt")? localStorage.getItem("jwt") : null;
export async function postData(url = '', data = {}, isJwtValid) {
    let config = null;
    const jwtToken = await getJwt();
    const AuthStr = "Bearer ".concat(jwtToken);
    if (isJwtValid){
          config = {headers : { Authorization: AuthStr} }
    }
    const newUrl = baseUrl + url;
    return Axios.post(newUrl, data, config)
  }

  export async function getData(url = '', isJwtValid) {
    let config = null;
    const jwtToken = await getJwt();
    const AuthStr = "Bearer ".concat(jwtToken);
    console.log(AuthStr)
    if (isJwtValid){
        config = {headers : { Authorization: AuthStr}}
        console.log(config);
    }
    const newUrl = baseUrl + url;
    return Axios.get(newUrl, config)
  }

  export async function putData(url = '', data = {}, isJwtValid) {
    let config = null;
    const jwtToken = await getJwt();
    const AuthStr = "Bearer ".concat(jwtToken);
    if (isJwtValid){
        config = {headers : { Authorization: AuthStr } }
    }
    const newUrl = baseUrl + url;
    return Axios.put(newUrl, data, config)
  }