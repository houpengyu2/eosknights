let headers = new Headers({
    "Content-Type": "application/json"
});

export function apiCall(method, url, data){
    return new Promise((resolve, reject) => {
        return fetch(url, {
            method, 
            headers,
            body: JSON.stringify(data)
        })
        .then(handleErrors)
        .then(res => resolve(res))
        .catch(err => {
            reject(err);
        })
    })
}

async function handleErrors(res){
    if(res.ok){
        return res.json();
    } else {
        let err = await res.json();
        throw Error(err.error.message);
    }
}