import EventEmitter from "events";

export class ApiManager extends EventEmitter {
  constructor() {
    super();
    this.errorsOfData = [];
  }

  setData(data, url, method) {
    // console.log("form api: ", data + " " + url + " " + method);
    return fetch(url, {
      method: method,
      mode: "cors",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log("from Api Manager Set: ", response);
        if (response.status === 200) return response;
        else throw new Error("Что-то пошло не так");
      })
      .catch((error) => {
        this.errorsOfData.push(error);
        this.errorsOfData.push(error);

        this.emit("apiError", error);
        return Promise.resolve({ error: error });
      });
  }

  getData(url, method) {
    //console.log("form apiManager Get: ", url + " " + method);
    return fetch(url, {
      method: method,
    })
      .then((response) => {
        //console.log("Response from api", response.status);
        if (response.status === 200) return response;
        else throw new Error("Что-то пошло не так");
      })
      .catch((error) => {
        console.log("Error from api", this.errorsOfData);
        this.errorsOfData.push(error);

        this.emit("apiError", error);
        return Promise.resolve({ error: error });
      });
  }
}

export const apiManager = new ApiManager();
