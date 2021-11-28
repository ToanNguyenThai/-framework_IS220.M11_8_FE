import axios from 'axios';
const apiBody = "http://localhost:3000"
export default function callApi (endpoint, method, data) {
    return axios({
        method: method,
        url: `${apiBody}/${endpoint}`,
        data: data
    }).catch(error=>{
        console.log(error);
    })
}