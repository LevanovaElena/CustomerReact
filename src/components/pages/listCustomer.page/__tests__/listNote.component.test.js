import { shallow } from "enzyme";
import ListNotes from "../listNote.component";
import mockListCustomers from "../../../../data";

describe("List Notes Component", () => {
  test("Should be rendered ", () => {
    const component = shallow(<ListNotes notes={mockListCustomers[0].notes} />);

    //expect(component.props.value).toEqual(mockListCustomers[0]);
    expect(component.find("table").length).toEqual(1);
    expect(component.find("tr").length).toEqual(3);
    expect(component.find("td").length).toEqual(3);
  });
});
