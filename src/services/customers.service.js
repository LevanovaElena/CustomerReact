import { API_ENDPOINT } from "../properties";

export function deleteCustomer(idCustomer) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;

  return fetch(url, { method: "DELETE", mode: "cors" })
    .then((result) => {
      if (result.status === 200) return result.json();
      else throw Error("Not delete customer!");
    })
    .catch(() => console.log("Error Delete"));
}

export function getCustomer(idCustomer) {
  const url = idCustomer
    ? `${API_ENDPOINT}/customers/${idCustomer}`
    : API_ENDPOINT + "/customers";

  return fetch(url, { method: "GET", mode: "cors" })
    .then((result) => {
      if (result.status === 200) return result.json();
      else return null;
    })
    .catch((error) => console.log(error.message));
}
export function updateCustomer(idCustomer, body) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;
  return fetch(url, {
    method: "PUT",
    mode: "cors",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) return result.json();
      else return null;
    })
    .catch((err) => console.log("Error Update Customer", err));
}

export function createCustomer(body) {
  const url = API_ENDPOINT + "/customers/";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      return result.json();
    })
    .catch(() => console.log("Error Create Customer"));
}
