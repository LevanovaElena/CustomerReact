import {
  getCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from "../customers.service.js";

import mocklistCustomers from "../../data";
import { apiManager } from "../apiManager";

jest.mock("../apiManager", () => {
  return {
    apiManager: {
      getData: (url, method) => {
        if (url.indexOf("150") != -1)
          return Promise.reject(new Error("Test error from getData"));
        switch (method) {
          case "GET":
            return Promise.resolve({ total: 0, docs: [{}, {}] });
          case "DELETE":
            return Promise.resolve({ n: 1, ok: 1, deletedCount: 1 });
          default:
            return Promise.reject(new Error(" Test error"));
        }
      },
      setData: (body, url, method) => {
        if (body === "Error") return Promise.reject(new Error(" Test error"));
        switch (method) {
          case "PUT":
            return Promise.resolve(mocklistCustomers[0]);
          case "POST":
            return Promise.resolve(mocklistCustomers[0]);
          default:
            return Promise.reject(new Error(" Test error"));
        }
      },
    },
  };
});

describe("Customer Service Tests", () => {
  test("Should Get Correct Data Customers Without Pagination", async () => {
    const customers = await getCustomer("1");
    expect(customers).not.toBeNull();
    expect(customers.docs.length).toEqual(2);
  });

  test("Should Delete Customer By Id", async () => {
    const customers = await deleteCustomer("1");
    expect(customers).not.toBeNull();
    expect(customers.deletedCount).toEqual(1);
  });

  test("Should Update Customer By Id", async () => {
    const customers = await updateCustomer("1");
    expect(customers).not.toBeNull();
    expect(customers).toEqual(mocklistCustomers[0]);
  });

  test("Should Create Customer", async () => {
    const customers = await createCustomer(mocklistCustomers[0]);
    expect(customers).not.toBeNull();
    expect(customers).toEqual(mocklistCustomers[0]);
  });
  test("Should Get Errors Create", async () => {
    apiManager.errorsOfData = [];
    let error = await createCustomer("Error");
    expect(error).not.toBeNull();
    console.log(apiManager.errorsOfData);
    expect(apiManager.errorsOfData[0].message).toEqual(" Test error");
  });

  test("Should Get Errors Update", async () => {
    apiManager.errorsOfData = [];
    const errorUpdate = await updateCustomer(1, "Error");
    expect(errorUpdate).not.toBeNull();
    console.log(apiManager.errorsOfData);
    expect(apiManager.errorsOfData.length).toEqual(1);
  });
  test("Should Get Errors Delete", async () => {
    apiManager.errorsOfData = [];
    const errorUpdate = await deleteCustomer(150);
    expect(errorUpdate).not.toBeNull();
    console.log(apiManager.errorsOfData);
    expect(apiManager.errorsOfData[0].message).toEqual(
      "Test error from getData"
    );
  });

  test("Should Get Errors Get", async () => {
    apiManager.errorsOfData = [];
    const errorUpdate = await getCustomer(150);
    expect(errorUpdate).not.toBeNull();
    console.log(apiManager.errorsOfData);
    expect(apiManager.errorsOfData[0].message).toEqual(
      "Test error from getData"
    );
  });
});
