var request = require('request-promise');

function apiCall(method, url, data){
    let message = {
        method,
        url,
        json: data
    }

    return request(message)
        // .then(res => JSON.parse(res))
        .catch(() => {
            let error = new Error("Internal Service Error");
            error.status = 500;
            throw error;
        })
}

module.exports = apiCall;
