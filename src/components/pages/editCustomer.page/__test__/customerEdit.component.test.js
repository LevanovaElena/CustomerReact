import { mount, shallow } from "enzyme";
import CustomerEdit from "../customerEdit.component";
import mockListCustomers from "../../../../data";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});
jest.mock("../../../../services/customers.service", () => {
  const mockResultEmpty = { total: 0, docs: [], skip: 0, limit: 0 };
  return {
    getCustomer: (idCustomer) => {
      switch (idCustomer) {
        case "1":
          return Promise.resolve(mockListCustomers[0]);
        case "0":
          return Promise.resolve({});
        default:
          return Promise.reject(new Error("Error from test ListCustomer"));
      }
    },
  };
});

describe("Customer Edit Component", () => {
  test("Should be rendered with LOADED", () => {
    const props = {
      match: { params: { id: "0" } },
    };
    const component = shallow(<CustomerEdit {...props} />);
    const nodeDiv = component.find("div");
    const nodeH2 = component.find("h2");
    expect(component.state().isLoaded).toEqual(false);
    expect(nodeDiv.length).toEqual(1);
    expect(nodeH2.length).toEqual(1);
    expect(nodeH2.text()).toEqual("Loading...");
  });

  test("Should be rendered with Correct Data", async () => {
    const props = {
      match: { params: { id: "1" } },
    };
    const component = mount(<CustomerEdit {...props} />);
    await component.update();

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().customer).not.toBeNull();
    expect(component.state().customer).toStrictEqual(mockListCustomers[0]);
    await component.update();
    const nodeForm = component.find("form");
    expect(nodeForm.length).toEqual(1);
  });
});
