class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this.userId = null;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then((res) =>
      this._getResponseData(res)
    );
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((result) => this._getResponseData(result));
  }

  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((result) => this._getResponseData(result))
  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => this._getResponseData(result));
  }

  getUserInfo() {
    return this._request("users/me", { headers: this._getHeaders() }).then(
      (resp) => {
        this.userId = resp._id;
        return resp.data;
      }
    );
  }

  setUserInfo(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
      .then((resp) => {
        return resp.data;
      });
  }

  addMovie(data) {
    return this._request("movies", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        image: data.image.url,
        thumbnail: data.image.thumbnail,
        trailerLink: data.trailerLink,
        movieId: data.id,
        description: data.description,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
      }),
    })
      .then((resp) => {
        return resp.data;
      });
  }

  deleteMovie(movieId) {
    return this._request(`movies/${movieId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }
}

const
  mainApi = new MainApi({
    baseUrl: "https://api.voloh.nomoredomainsrocks.ru"
  });

export {mainApi};