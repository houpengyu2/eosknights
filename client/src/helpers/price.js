import {apiCall} from './api';

const URL = '/api/price'

export async function getPrice(){
    return apiCall("get", URL)
}