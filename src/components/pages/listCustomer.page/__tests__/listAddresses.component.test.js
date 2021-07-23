import { shallow } from "enzyme";
import ListAddresses from "../listAddresses.component";
import mockListCustomers from "../../../../data";

describe("List Addresses Component", () => {
  test("Should be rendered ", () => {
    const component = shallow(
      <ListAddresses value={mockListCustomers[0].addressesList} />
    );

    //expect(component.props.value).toEqual(mockListCustomers[0]);
    expect(component.find("table").length).toEqual(1);
    expect(component.find("tr").length).toEqual(2);
    expect(component.find("td").length).toEqual(14);
  });
});
