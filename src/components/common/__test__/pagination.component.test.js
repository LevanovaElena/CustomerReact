import { mount, shallow } from "enzyme";
import Pagination from "../pagination.component";

describe("Pagination Component Test", () => {
  test("Should be rendered ", async () => {
    const component = shallow(<Pagination />);
    expect(component.find("button").length).toEqual(3);
  });
});
