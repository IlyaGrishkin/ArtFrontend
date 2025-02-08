import axios from 'axios'


export function sendRequest(method, url, body=null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            }
            else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(body))
    })
}


function getData() {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
    const apiUrl = `http://localhost:8000/api/v1/customers/refresh`;
    const xhr = new XMLHttpRequest()
    xhr.open('POST', apiUrl, )
    axios.post(apiUrl,
        {
            refresh_token: refreshToken
        }
    )

        .then((resp) => {
            const serverData = resp.data;
            const accessToken = serverData.data.access_token
            const refreshToken = serverData.data.refresh_token
            const expires = serverData.data.expires_in
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
            localStorage.setItem('expires', JSON.stringify(expires))
        });
}


export function handleToken() {
    const expires = parseInt(JSON.parse(localStorage.getItem("expires")))
    if (expires) {
        const date = Math.floor(Date.now() / 1000)
        //console.log(date, expires)
        if (date > expires) {
            sendRequest('POST', 'http://localhost:8000/api/')
                .then(resp => console.log(resp))
        }
    }
}