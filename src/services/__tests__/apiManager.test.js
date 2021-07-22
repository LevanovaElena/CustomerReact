import { ApiManager } from "../apiManager";
import fetchMock from "fetch-mock-jest";
import listCustomers from "../../data";
import { API_ENDPOINT } from "../../properties";

describe("Api Manager Class Tests", () => {
  beforeEach(() => {
    fetchMock.reset();
  });
  const apiManager = new ApiManager();

  test("Should be  correct object creation", () => {
    expect(apiManager.errorsOfData).toEqual([]);
  });

  test("Should Get Correct Data from GET", async () => {
    const resultFull = { total: 2, docs: listCustomers, skip: 0, limit: 100 };
    const resultOne = listCustomers[0];
    const urlForList = `${API_ENDPOINT}/customer/`;
    const urlForOne = `${API_ENDPOINT}/customer/1`;

    fetchMock.get(urlForList, resultFull).get(urlForOne, resultOne);

    const method = "GET";

    let result = await apiManager.getData(urlForList, method);
    //console.log(result.body);
    expect(result).not.toBeNull();
    expect(result).toEqual(resultFull);

    result = await apiManager.getData(urlForOne, method);
    expect(result).not.toBeNull();
    expect(result).toEqual(resultOne);
  });
  test("Should Get Correct Data from Delete", async () => {
    const resultDelete = {
      n: 1,
      ok: 1,
      deletedCount: 1,
    };
    const url = `${API_ENDPOINT}/customer/1`;
    fetchMock.delete(url, resultDelete);

    const method = "DELETE";

    const result = await apiManager.getData(url, method);

    expect(result).not.toBeNull();
    expect(result).toEqual(resultDelete);
  });

  test("Should Get Correct Data from PUT", async () => {
    const resultUpdate = {
      n: 1,
      nModified: 1,
      ok: 1,
    };
    const url = `${API_ENDPOINT}/customer/1`;
    fetchMock.put(url, resultUpdate);

    const method = "PUT";

    const result = await apiManager.setData(listCustomers[0], url, method);

    expect(result).not.toBeNull();
    expect(result).toEqual(resultUpdate);
  });

  test("Should Get Correct Data from POST", async () => {
    const url = API_ENDPOINT;

    fetchMock.post(url, listCustomers[0]);
    const method = "POST";
    const result = await apiManager.setData(listCustomers[0], url, method);
    expect(result).not.toBeNull();
  });

  test("Should Get Errors ", async () => {
    const resultFull = { total: 2, docs: listCustomers, skip: 0, limit: 100 };
    const resultOne = listCustomers[0];
    const urlForList = `${API_ENDPOINT}/customer/`;
    const urlForOne = `${API_ENDPOINT}/customer/1`;

    fetchMock.mock(urlForList, () => {
      throw new Error("ERROR_MESSAGE");
    });

    let method = "GET";
    let result = await apiManager.getData(urlForList, method);

    expect(result).not.toBeNull();
    expect(apiManager.errorsOfData.length).toEqual(1);
    expect(apiManager.errorsOfData[0].message).toEqual("ERROR_MESSAGE");

    method = "POST";
    result = await apiManager.setData(resultOne, urlForList, method);
    expect(result).not.toBeNull();
    expect(apiManager.errorsOfData.length).toEqual(2);
    expect(apiManager.errorsOfData[1].message).toEqual("ERROR_MESSAGE");
  });

  test("Should Get Errors For status 400 and other", async () => {
    const resultOne = listCustomers[0];
    const urlForList = `${API_ENDPOINT}/customer/`;
    const apiManager2 = new ApiManager();
    fetchMock.mockClear();
    fetchMock
      .get(urlForList, () => {
        return Promise.resolve({ status: 400 });
      })
      .post(urlForList, () => {
        return 400;
      });

    let method = "GET";
    await apiManager2.getData(urlForList, method);

    expect(apiManager2.errorsOfData.length).toEqual(1);
    expect(apiManager2.errorsOfData[0].message).toEqual(
      "Error for 404 and other"
    );

    method = "POST";
    await apiManager2.setData(resultOne, urlForList, method);
    expect(apiManager2.errorsOfData.length).toEqual(2);
    expect(apiManager2.errorsOfData[1].message).toEqual(
      "Error for 404 and other"
    );
  });
});
