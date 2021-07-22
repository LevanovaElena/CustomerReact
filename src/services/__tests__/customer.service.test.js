import {
  getCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from "../customers.service.js";
import { API_ENDPOINT } from "../../properties";
import listCustomers from "../../data";
import ApiManager from "../apiManager";

jest.mock("../apiManager");

jest.mock("../apiManager", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getData: (params) => {
        switch (params.method) {
          case "GET":
            return Promise.resolve({ total: 0, docs: [{}, {}], ...params });
          case "DELETE":
            return Promise.resolve({ n: 1, ok: 1, deletedCount: 1 });
        }
      },
    };
  });
});

describe("Customer Service Tests", () => {
  beforeAll(() => {
    ApiManager.mockImplementation(() => {
      return {
        getData: () => {
          throw new Error("Test error");
        },
      };
    });
  });
  test("Should Get Correct Data Customers Without Pagination", async () => {
    const apiManager = new ApiManager();
    console.log(apiManager);
    const customers = await getCustomer("1", apiManager);
    expect(customers).not.toBeNull();
    expect(customers.docs.length).toEqual(2);
    const customer = await getCustomer("1");
    expect(customer).not.toBeNull();
  });

  test("Should Delete Customer By Id", async () => {});

  test("Should Update Customer By Id", async () => {});

  test("Should Create Customer", async () => {});
});
