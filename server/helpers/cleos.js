const apiCall = require('./api');

const ENDPOINT = 'https://api.eosnewyork.io/v1';
// const ENDPOINT = 'https://mainnet.eoscanada.com/v1';

exports.getInfo = async function(){
    const action = "/chain/get_info";
    const url = ENDPOINT + action;
    
    return apiCall("get", url)
}

exports.getScope = async function(code, table){
    const action = "/chain/get_table_by_scope";
    const url = ENDPOINT + action;
    const data = {
        "code": code, 
        "table": table,
    }

    return apiCall("POST", url, data)
}


exports.getTable = async function(scope, code, table, lower_bound=undefined, limit=undefined){
    const action = "/chain/get_table_rows";
    const url = ENDPOINT + action;
    const data = {
        scope,
        code,
        table,
        json: true,
        ...(lower_bound  && {lower_bound}),
        ...(limit && {limit})
    }

    return apiCall("post", url, data)
}


