import { mount, shallow } from "enzyme";
import { Errors } from "../error.component";

describe("Pagination Component Test", () => {
  test("Should be rendered ", async () => {
    const component = shallow(
      <Errors errorsOld={[{ error: "error", stack: "stack" }]} />
    );
    expect(component.find("ul").length).toEqual(1);
    expect(component.find("li").length).toEqual(0);
  });
});
