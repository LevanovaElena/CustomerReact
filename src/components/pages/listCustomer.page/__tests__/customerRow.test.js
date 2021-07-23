import { shallow } from "enzyme";
import CustomerRow from "../CustomerRow";
import mockListCustomers from "../../../../data";

describe("Customer Row Component", () => {
  test("Should be rendered ", () => {
    const component = shallow(<CustomerRow value={mockListCustomers[0]} />);

    //expect(component.props.value).toEqual(mockListCustomers[0]);
    expect(component.find("tr").length).toEqual(1);
    expect(component.find("td").length).toEqual(8);
  });
});
