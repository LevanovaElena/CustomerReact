import { mount, shallow } from "enzyme";
import ListAddressesEdit from "../ListAddressesEdit.component";
import mockListCustomers from "../../../../data";

describe("List Addresses Edit Component", () => {
  const mockErrors = {};
  test("Should be rendered ", async () => {
    const component = shallow(
      <ListAddressesEdit
        addresses={mockListCustomers[0].addressesList}
        errors={mockErrors}
      />
    );

    //expect(component.find("table").length).toEqual(1);
  });
});
