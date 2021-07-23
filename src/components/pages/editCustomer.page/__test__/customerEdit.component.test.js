import { mount, shallow } from "enzyme";
import CustomerEdit from "../customerEdit.component";
import mockListCustomers from "../../../../data";

const mockNewCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  totalPurchasesAmount: 0,
  notes: [{ note: "" }],
  addressesList: [
    {
      addressLine: "",
      addressLine2: "",
      typeAddress: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    },
  ],
};

jest.mock("react-router-dom", () => {
  return {
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});
jest.mock("../../../../services/customers.service", () => {
  return {
    getCustomer: (idCustomer) => {
      switch (idCustomer) {
        case "1":
          return Promise.resolve(mockListCustomers[0]);
        case "25":
          return Promise.resolve(mockNewCustomer);
        case "new":
          return Promise.resolve(mockNewCustomer);
        case "2":
          return Promise.resolve(mockListCustomers[1]); //not correct data
        default:
          return Promise.reject(new Error("Error from test ListCustomer"));
      }
    } /*,
    createCustomer:(body)=> {
      return Promise.resolve("Ok");
    },*/,
  };
});

describe("Customer Edit Component", () => {
  test("Should be rendered with loaded=false", () => {
    const props = {
      match: { params: { id: "25" } },
    };
    const component = shallow(<CustomerEdit {...props} />);
    component.update();
    expect(component.state().isLoaded).toEqual(false);
    expect(component.state().customer).toStrictEqual(mockNewCustomer);

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
    const component = shallow(<CustomerEdit {...props} />);
    await component.update();

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().customer).not.toBeNull();
    expect(component.state().customer).toStrictEqual(mockListCustomers[0]);
    await component.update();

    const nodeFormik = component.find("Formik");
    expect(nodeFormik.length).toEqual(1);
    expect(nodeFormik.props().initialValues).toEqual(mockListCustomers[0]);
    //console.log(nodeFormik);
    expect(nodeFormik.errors).toEqual(undefined);
  });

  test("Should be Delete Data Customer If Update Page", async () => {
    const props = {
      match: { params: { id: "1" } },
    };
    const component = shallow(<CustomerEdit {...props} />);

    await component.update();
    await component.instance().componentWillUnmount();
    expect(component.state().customer).toStrictEqual(mockNewCustomer);
  });

  test("Should be Submit and Get Errors in Validation Data", async () => {
    const props = {
      match: { params: { id: "2" } },
    };
    const component = mount(<CustomerEdit {...props} />);
    await component.update();

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().customer).not.toBeNull();
    expect(component.state().customer).toStrictEqual(mockListCustomers[1]);
    await component.update();

    const nodeFormik = component.find("Formik");
    expect(nodeFormik.length).toEqual(1);
    expect(nodeFormik.props().initialValues).toEqual(mockListCustomers[1]);

    const formNode = component.find("form");
    expect(formNode.length).toEqual(1);
    await formNode.simulate("submit");
    // Submit the form and wait for everything to resolve.
    await new Promise((resolve) => setImmediate(resolve));
    await component.update();

    expect(component.find({ id: "phoneNumberError" }).length).toEqual(1);
    expect(component.find(".text-danger").length).toEqual(13);
  });

  test("Should be Submit and Update Customer", async () => {
    const props = {
      match: { params: { id: "1" } },
    };
    const componentUpdateData = jest.spyOn(
      CustomerEdit.prototype,
      "updateData"
    );
    const componentOnSave = jest.spyOn(CustomerEdit.prototype, "onSaveClick");
    const component = mount(<CustomerEdit {...props} />);
    await component.update();

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().customer).not.toBeNull();
    await component.update();

    const nodeFormik = component.find("Formik");
    expect(nodeFormik.length).toEqual(1);
    expect(nodeFormik.props().initialValues).toEqual(mockListCustomers[0]);

    const formNode = component.find("form");
    expect(formNode.length).toEqual(1);
    await formNode.simulate("submit");

    // Submit the form and wait for everything to resolve.
    await new Promise((resolve) => setImmediate(resolve));
    await component.update();

    expect(component.find(".text-danger").length).toEqual(0); //нет ошибок,значит вызвалась функция обновления
    await component.update();
    expect(componentOnSave).toHaveBeenCalledTimes(1);
    expect(componentUpdateData).toHaveBeenCalledTimes(1);
  });

  test("Should be Render New Customer and Submit with Create", async () => {
    const props = {
      match: { params: { id: "new" } },
    };
    const componentCreateData = jest.spyOn(
      CustomerEdit.prototype,
      "createData"
    );
    const componentOnSave = jest.spyOn(CustomerEdit.prototype, "onSaveClick");
    //const componentViewModal = jest.spyOn(CustomerEdit.prototype, "viewModal");
    const component = mount(<CustomerEdit {...props} />);
    await component.update();

    expect(component.state().isLoaded).toEqual(true);
    expect(component.state().isNewCustomer).toEqual(true);
    await component.update();

    const nodeFormik = component.find("Formik");
    expect(nodeFormik.length).toEqual(1);
    expect(nodeFormik.props().initialValues).toEqual(mockNewCustomer);

    //изменим данные на корректные
    component
      .find('input[name="firstName"]')
      .simulate("change", { target: { name: "firstName", value: "Anton" } });
    component
      .find('input[name="lastName"]')
      .simulate("change", { target: { name: "lastName", value: "Ivanov" } });
    component.find('input[name="email"]').simulate("change", {
      target: { name: "email", value: "ivanov@gmail.com" },
    });
    component.find('input[name="phoneNumber"]').simulate("change", {
      target: { name: "phoneNumber", value: "+737495336650" },
    });
    component.find('input[name="totalPurchasesAmount"]').simulate("change", {
      target: { name: "totalPurchasesAmount", value: "56" },
    });
    component.find('input[name="notes[0].note"]').simulate("change", {
      target: { name: "notes[0].note", value: "note" },
    });
    component
      .find('input[name="addressesList[0].addressLine"]')
      .simulate("change", {
        target: { name: "addressesList[0].addressLine", value: "address" },
      });
    component
      .find('input[name="addressesList[0].addressLine2"]')
      .simulate("change", {
        target: { name: "addressesList[0].addressLine2", value: "address2" },
      });
    component
      .find('input[name="addressesList[0].typeAddress"]')
      .simulate("change", {
        target: { name: "addressesList[0].typeAddress", value: "Billing" },
      });
    component.find('input[name="addressesList[0].city"]').simulate("change", {
      target: { name: "addressesList[0].city", value: "Billing" },
    });
    component
      .find('input[name="addressesList[0].postalCode"]')
      .simulate("change", {
        target: { name: "addressesList[0].postalCode", value: "123456" },
      });
    component.find('input[name="addressesList[0].state"]').simulate("change", {
      target: { name: "addressesList[0].state", value: "Billing" },
    });
    component
      .find('input[name="addressesList[0].country"]')
      .simulate("change", {
        target: { name: "addressesList[0].country", value: "Canada" },
      });
    //await component.update();
    component.find("form").simulate("submit");

    // Submit the form and wait for everything to resolve.
    await new Promise((resolve) => setImmediate(resolve));
    await component.update();

    expect(component.find(".text-danger").length).toEqual(0); //нет ошибок,значит вызвалась функция onSaveClick
    await component.update();
    expect(componentOnSave).toHaveBeenCalledTimes(1);
    await component.update();
    expect(componentCreateData).toHaveBeenCalledTimes(1);

    //expect(componentViewModal).toHaveBeenCalledTimes(1);//componentViewModal
  });
});
