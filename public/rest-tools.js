const post = (url, data) => {
  return fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then()(response => {})
    .then(data => {})
    .catch(error => console.error(error));
};

const get = (url, ...params) => {
  return fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data})
    .catch(error => console.error(error));
};

export default {
  post,
  get
};
