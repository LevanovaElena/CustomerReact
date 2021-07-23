import { shallow } from "enzyme";
import ProductsList from "../products.component";

describe("Product List Component Test", () => {
  test("Should be rendered ", async () => {
    const component = shallow(<ProductsList />);
    expect(component.find("div").length).toEqual(1);
  });
});
