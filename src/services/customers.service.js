import { API_ENDPOINT } from "../properties";
import { apiManager } from "./apiManager";

export function deleteCustomer(idCustomer) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;

  return apiManager
    .getData(url, "DELETE")
    .then((result) => {
      if (!result.error) return result;
    })
    .catch((error) => {
      if (apiManager.errorsOfData) apiManager.errorsOfData.push(error);
    });
}

export function getCustomer(idCustomer) {
  const url = idCustomer
    ? `${API_ENDPOINT}/customers/${idCustomer}`
    : API_ENDPOINT + "/customers";
  console.log(apiManager);
  return apiManager
    .getData(url, "GET")
    .then((result) => {
      if (!result.error) return result;
    })
    .catch((error) => {
      if (apiManager.errorsOfData) apiManager.errorsOfData.push(error);
    });
}

export function updateCustomer(idCustomer, body) {
  const url = `${API_ENDPOINT}/customers/${idCustomer}`;

  return apiManager
    .setData(body, url, "PUT")
    .then((result) => {
      if (!result.error) return result;
    })
    .catch((error) => {
      if (apiManager.errorsOfData) apiManager.errorsOfData.push(error);
    });
}

export function createCustomer(body) {
  const url = API_ENDPOINT + "/customers/";
  return apiManager
    .setData(body, url, "POST")
    .then((result) => {
      if (!result.error) return result;
    })
    .catch((error) => {
      if (apiManager.errorsOfData) apiManager.errorsOfData.push(error);
    });
}
