import {
  getCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from "../customers.service.js";
import { API_ENDPOINT } from "../../properties";
import listCustomers from "../../data";

const fetchMock = require("fetch-mock-jest");

describe("Customer Service Tests", () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  test("Should Get Correct Data Customers Without Pagination", async () => {
    const resultFull = { total: 2, docs: listCustomers, skip: 0, limit: 100 };
    const resultOne = listCustomers[0];
    fetchMock
      .get(`${API_ENDPOINT}/customer/`, resultFull)
      .get(`${API_ENDPOINT}/customer/1`, resultOne);

    const customers = await getCustomer();
    expect(customers).not.toBeNull();
    expect(customers.docs.length).toEqual(2);
    const customer = await getCustomer("1");
    expect(customer).not.toBeNull();
  });

  test("Should Delete Customer By Id", async () => {
    const result = {
      n: 1,
      ok: 1,
      deletedCount: 1,
    };
    fetchMock.delete(`${API_ENDPOINT}1`, result);

    const isDelete = await deleteCustomer("1");
    expect(isDelete).not.toBeNull();
    expect(isDelete.deletedCount).toEqual(1);
  });

  test("Should Update Customer By Id", async () => {
    const result = {
      n: 1,
      nModified: 1,
      ok: 1,
    };
    fetchMock.put(`${API_ENDPOINT}1`, result);

    const isUpdate = await updateCustomer("1", listCustomers[0]);
    expect(isUpdate).not.toBeNull();
    expect(isUpdate.nModified).toEqual(1);
  });

  test("Should Create Customer", async () => {
    fetchMock.post(`${API_ENDPOINT}`, listCustomers[0]);

    const isCreate = await createCustomer(listCustomers[0]);
    expect(isCreate).not.toBeNull();
  });
});
