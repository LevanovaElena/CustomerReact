import EventEmitter from "events";

class ApiManager extends EventEmitter {
  constructor() {
    super();
    this.errorsOfData = [];
  }

  //for POST,PUT
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
        if (response.status === 200) return response.json();
        else throw new Error("Error for 404 and other");
      })
      .catch((error) => {
        this.errorsOfData.push(error);
        this.emit("apiError", error);
        return Promise.resolve({ error: error });
      });
  }

  //for GET,DELETE
  getData(url, method) {
    //console.log("form apiManager Get: ", url + " " + method);
    return fetch(url, { method: method })
      .then((response) => {
        if (response.status === 200) return response.json();
        else
          throw new Error(" Error from server: " + response.status.toString());
      })
      .catch((error) => {
        this.errorsOfData.push(error);

        this.emit("apiError", error);
        return Promise.resolve({ error: error });
      });
  }
}

export const apiManager = new ApiManager();
