import { API_ENDPOINT } from "../properties";
//import { apiManager } from "../components/common/apiManager";

export function deleteCustomer(idCustomer, apiManager) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;

  return apiManager
    .getData(url, "DELETE")
    .then((result) => {
      if (!result.error) return result.json();
    })
    .catch((error) => console.log("Error from api", error));
  /*return fetch(url, { method: "DELETE", mode: "cors" })
    .then((result) => {
      if (result.status === 200) return result.json();
      else throw Error("Not delete customer!");
    })
    .catch(() => console.log("Error Delete"));*/
}

export function getCustomer(idCustomer, apiManager) {
  const url = idCustomer
    ? `${API_ENDPOINT}/customers/${idCustomer}`
    : API_ENDPOINT + "/customers";

  return apiManager
    .getData(url, "GET")
    .then((result) => {
      if (!result.error) return result.json();
    })
    .catch((error) => console.log("Error from api", error));
}

export function updateCustomer(idCustomer, body, apiManager) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;

  return apiManager
    .setData(body, url, "PUT")
    .then((result) => {
      if (!result.error) return result.json();
    })
    .catch((error) => console.log("Error from api", error));
}

export function createCustomer(body, apiManager) {
  const url = API_ENDPOINT + "/customers/";
  return apiManager
    .setData(body, url, "POST")
    .then((result) => {
      if (!result.error) return result.json();
    })
    .catch((error) => console.log("Error from api", error));

  /*  return fetch(url, {
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
    .catch(() => console.log("Error Create Customer"));*/
}
