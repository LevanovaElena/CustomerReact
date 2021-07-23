import App from "../App";
import { mount, shallow } from "enzyme";
import CustomerEdit from "../pages/editCustomer.page/customerEdit.component";

describe("App Component Tests", () => {
  test("Should be rendered correct", () => {
    const component = shallow(<App />);
    const navElement = component.find("nav");
    expect(navElement.length).toEqual(1);
    /*const aElement = component.find("a");
    expect(aElement.length).toEqual(3);*/

    expect(component.find("Route").length).toEqual(4);
    expect(component.find("Route").at(0).props().path).toBe("/edit/:id");
    expect(component.find("Route").at(0).props().component.name).toBe(
      "CustomerEdit"
    );
    expect(component.find("Route").at(1).props().path).toBe("/products");
    expect(component.find("Route").at(2).props().path).toBe("/");
    expect(component.find("Route").at(3).props().path).toBe("/delete/:id");
    expect(component.find("Route").at(3).props().component.name).toBe(
      "DeleteCustomer"
    );
  });
});
