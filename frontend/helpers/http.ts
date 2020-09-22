export const http = {
  get,
  post,
  put,
  del,
};
const token = "";
function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response: any) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then((data: any) => {
      return data;
    });
  }
  return response.text().then((text: string) => {
    return text;
  });
}
