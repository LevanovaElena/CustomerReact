import { shallow, mount } from "enzyme";
import mockListCustomers from "../../../../data";
import ListCustomers from "../listCustomers.component";
import { act } from "@testing-library/react";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});
jest.mock("../../../../services/customers.service", () => {
  //const mockList = listCustomers;
  const mockResult = { total: 2, docs: mockListCustomers, skip: 0, limit: 100 };
  const mockResultEmpty = { total: 0, docs: [], skip: 0, limit: 0 };
  return {
    getCustomer: (idCustomer, params) => {
      switch (params.limit) {
        case "5":
          return Promise.resolve(mockResult);
        case "0":
          return Promise.resolve(mockResultEmpty);
        default:
          return Promise.reject(new Error("Error from test ListCustomer"));
      }
    },
  };
});

describe("List Customers Page Component", () => {
  test("Should be rendered with State isLoaded=false", () => {
    const component = shallow(<ListCustomers limit="50" />);
    const nodeDiv = component.find("div");
    const nodeH2 = component.find("h2");
    expect(component.state().isLoaded).toEqual(false);
    expect(nodeDiv.length).toEqual(2);
    expect(nodeH2.length).toEqual(1);
    expect(nodeH2.text()).toEqual("Loading...");
  });

  test("Should be rendered with State isLoaded=true and List Length =0", async () => {
    const componentGetData = jest.spyOn(ListCustomers.prototype, "getData");

    const componentDidMountSpy = jest.spyOn(
      ListCustomers.prototype,
      "componentDidMount"
    );

    const component = mount(<ListCustomers limit="0" />);
    await component.update();
    const nodeDiv = component.find("div");
    const nodeH2 = component.find("h2");

    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    expect(componentGetData).toBeCalledWith({ skip: "0", limit: "0" }); //.toHaveBeenCalledTimes(1);

    expect(component.state().listCustomers.length).toEqual(0);
    expect(component.state().isLoaded).toEqual(true);

    expect(nodeDiv.length).toEqual(2);
    expect(nodeH2.length).toEqual(1);
    expect(nodeH2.text()).toEqual("No Customers");
  });

  test("Should be rendered with Correct Full List Customers", async () => {
    const componentGetData = jest.spyOn(ListCustomers.prototype, "getData");
    const componentDidMountSpy = jest.spyOn(
      ListCustomers.prototype,
      "componentDidMount"
    );
    let component = await shallow(<ListCustomers limit="5" />);
    await act(async () => {
      //component = await shallow(<ListCustomers limit="5" />);
      await component.update();
    });

    await component.update();

    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    expect(componentGetData).toBeCalledWith({ skip: "0", limit: "5" });

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().listCustomers.length).toEqual(2);
    const nodeTable = component.find("CustomerRow");
    expect(nodeTable.length).toEqual(2);
  });
});
