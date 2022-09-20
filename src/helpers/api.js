const API_URL = 'http://localhost:5000/api/v1';

const get = async (endpoint) => {
  try {
    return await (
      await fetch(API_URL + endpoint, {
        method: 'GET',
        credentials: 'include',
      })
    ).json();
  } catch (error) {
    console.log(error);
  }
};

const post = async (endpoint, data) => {
  try {
    return await (
      await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    console.log(error);
  }
};

const api = { get, post };

export default api;
