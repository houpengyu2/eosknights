import {apiCall} from './api';

const ENDPOINT = 'https://api.eosnewyork.io/v1';

export async function getInfo(){
    const action = "/chain/get_info";
    const url = ENDPOINT + action;

    return apiCall("get", url)
}

export async function getAccount(account){
    const action = "/chain/get_account";
    const url = ENDPOINT + action;
    const data = {account_name: account}

    return apiCall("post", url, data)
}


export async function getTable(scope, code, table, lower_bound=undefined, upper_bound=undefined, limit=undefined){
    const action = "/chain/get_table_rows";
    const url = ENDPOINT + action;
    const data = {
        scope,
        code,
        table,
        json: true,
        ...((lower_bound && upper_bound) && {lower_bound, upper_bound}),
        ...(limit && {limit})
    }

    return apiCall("post", url, data)
}

// Rankings are fetched from server
export async function getRankings(){
    return apiCall("get", "/api/rankings")
}




