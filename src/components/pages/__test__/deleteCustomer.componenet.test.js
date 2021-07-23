import { mount, shallow } from "enzyme";
import DeleteCustomer from "../deleteCustomer.component";

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    Redirect: ({ children, to }) => <a href={to}>{children}</a>,
  };
});
jest.mock("../../../services/customers.service", () => {
  return {
    deleteCustomer: (idCustomer) => {
      switch (idCustomer) {
        case "1":
          return Promise.resolve({ n: 1, ok: 1, deletedCount: 1 });

        default:
          return Promise.reject(new Error("Error from test DeleteCustomer"));
      }
    },
  };
});
describe("Delete Customer Component Test", () => {
  const mockErrors = {};

  test("Should be rendered ", async () => {
    const props = {
      match: { params: { id: "1" } },
    };
    const component = shallow(<DeleteCustomer {...props} />);
    await component.update();
    expect(component.state().isDelete).toEqual(false);

    expect(component.find("div").length).toEqual(2);
    expect(component.find({ id: "btnDelete" }).length).toEqual(1);
  });

  test("Should be Click Button Delete ", async () => {
    const props = {
      match: { params: { id: "1" } },
    };
    const componentOnClick = jest.spyOn(
      DeleteCustomer.prototype,
      "handleClickDelete"
    );
    const component = mount(<DeleteCustomer {...props} />);
    await component.update();
    expect(component.state().isDelete).toEqual(false);

    component.find({ id: "btnDelete" }).simulate("click");
    expect(componentOnClick).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setImmediate(resolve));
    await component.update();

    expect(component.state().isDelete).toEqual(true);
  });
});
