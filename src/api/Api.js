class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        return (res.ok) ? res.json() : Promise.reject(res.json());
    }

    loginUser(username, password) {
        return fetch(`${this._baseUrl}/api/login_check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    getToken(jwt) {
        return fetch(`${this._baseUrl}/api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    createTask(total_withdrawal_amount, min_withdrawal_amount, max_withdrawal_amount, payment_method) {
        return fetch(`${this._baseUrl}/api/task`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                total_withdrawal_amount: total_withdrawal_amount,
                min_withdrawal_amount: min_withdrawal_amount,
                max_withdrawal_amount: max_withdrawal_amount,
                payment_method: payment_method
            })
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    cancelTask() {
        return fetch(`${this._baseUrl}/api/task/cancel`, {
            method: 'POST',
            headers: this._headers
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    startTask() {
        return fetch(`${this._baseUrl}/api/task/start`, {
            method: 'POST',
            headers: this._headers
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    pauseTask() {
        return fetch(`${this._baseUrl}/api/task/pause`, {
            method: 'POST',
            headers: this._headers
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    getActiveTask() {
        return fetch(`${this._baseUrl}/api/activeTask`, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    setHeadersAuth(token) {
        this._headers = {...this._headers, Authorization: `Bearer ${token}`};
    }
}

const api = new Api({
    baseUrl: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
