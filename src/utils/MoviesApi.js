class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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

  getMovies() {
    return this._request("/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (resp) => {
        return resp;
      }
    );
  }
}

const
  moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies"
  });

export {moviesApi};