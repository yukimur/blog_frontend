
import axios from 'axios'
// import {Message} from 'element-ui';
var sprintf = require('sprintf-js').sprintf

function get_token(){
    var token = window.localStorage.getItem("token");
    if(token==undefined||token=="undefined"||token==null||token=="null"){
        return null;
    }else{
        return "Bearer "+window.localStorage.getItem("token");
    }
}

class Request {
    constructor () {
        
    }

    get (url,params) {
        return this.request('get',url,params);
    }
    post (url,params) {
        return this.request('post',url,params);
    }
    put (url,params) {
        return this.request('put',url,params);
    }
    patch (url,params) {
        return this.request('patch',url,params);
    }
    delete (url,params) {
        return this.request('delete',url,params);
    }
    request(method, url,params) {
        var query,body,headers;
        if(params){
            if (params["urlParams"]){
                url = sprintf(url, params["urlParams"])
            }
            query = params["query"];
            body = params["body"];
            headers = params["headers"];
        }
        if(headers==undefined){
            headers = {};
        }
        var token = get_token();
        if(token!=undefined && token!=null){
            headers["Authorization"] = token;
        }else{
            delete headers["Authorization"];
        }
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                data:body,
                params:query,
                headers:headers
            }).then((res) => {
                resolve(res);
            }).catch((res) => {
                reject(res.response);
            });
        });
    }
}

export const http = new Request();
