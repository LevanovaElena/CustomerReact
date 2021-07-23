import React from "react";
import { Formik, Field, Form } from "formik";
import {
  getCustomer,
  updateCustomer,
  createCustomer,
} from "../../../services/customers.service";
import { Link } from "react-router-dom";
import SignupSchema from "../../common/validationSchema";
import Customer from "../../common/customerObject";
import Modal from "../../common/modalWindow.component";
import { apiManager } from "../../../services/apiManager";
import { Errors } from "../../common/error.component";
import ListNoteEdit from "./listNoteEdit.component";
import ListAddressesEdit from "./ListAddressesEdit.component";

class CustomerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: Customer,
      isLoaded: this.props.match.params.id === "new",
      isNewCustomer: this.props.match.params.id === "new",
      modalVisible: false,
      modalTitle: "title",
      modalContent: "content",
    };
    this.onCloseModal = this.onCloseModal.bind(this);
    this.idCustomer = this.props.match.params.id;
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onCloseModal() {
    this.setState((prevState) => ({
      modalVisible: !prevState,
    }));
  }
  viewModal(title, content) {
    this.setState({
      modalTitle: title,
      modalContent: content,
      modalVisible: true,
    });
  }

  componentDidMount() {
    if (!this.state.isNewCustomer) this.getData();
  }
  componentWillUnmount() {
    this.setState({
      customer: Customer,
    });
  }

  getData() {
    getCustomer(this.idCustomer).then((data) => {
      if (!data) this.viewModal("Loading customer data", "Customer not found!");
      else this.setState({ customer: data, isLoaded: true });
    });
  }

  updateData(values) {
    updateCustomer(this.idCustomer, values).then((result) => {
      if (!result)
        this.viewModal("Updating customer data", "Customer was not saved!");
      else this.viewModal("Updating customer data", "Customer was saved!");
    });
  }

  createData(values) {
    createCustomer(values)
      .then((result) => {
        if (!result)
          this.viewModal("Saving of customer", "Customer was not saved!");
        else this.viewModal("Save of customer", "Customer was saved!");
      })
      .catch((error) => this.viewModal("Error!", "Not Found Error"));
  }

  onSaveClick(values) {
    console.log(values);

    if (!this.state.isNewCustomer)
      this.updateData(JSON.stringify(values, null, 2));
    else this.createData(JSON.stringify(values, null, 2));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <Formik
        initialValues={this.state.customer}
        validationSchema={SignupSchema}
        onSubmit={this.onSaveClick}
      >
        {(formik) => {
          console.log("Formik props", formik);

          const { errors, touched } = formik;
          return (
            <>
              <Form>
                <div className="m-5 w-50">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="small text-danger">{errors.firstName}</div>
                  ) : null}

                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="small text-danger">{errors.lastName}</div>
                  ) : null}

                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="firstname@google.com"
                    type="email"
                    className="form-control"
                  />
                  {errors.email && touched.email ? (
                    <div className="small text-danger">{errors.email}</div>
                  ) : null}

                  <label htmlFor="phoneNumber" className="form-label">
                    phoneNumber
                  </label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+7000 000 000"
                    type="phone"
                    className="form-control"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div id="phoneNumberError" className="small text-danger">
                      {errors.phoneNumber}
                    </div>
                  ) : null}

                  <label htmlFor="totalPurchasesAmount" className="form-label">
                    totalPurchasesAmount
                  </label>
                  <Field
                    id="totalPurchasesAmount"
                    name="totalPurchasesAmount"
                    type="number"
                    className="form-control"
                  />
                  {errors.totalPurchasesAmount &&
                  touched.totalPurchasesAmount ? (
                    <div className="small text-danger">
                      {errors.totalPurchasesAmount}
                    </div>
                  ) : null}
                </div>
                <div className="form-control m-5 w-75">
                  <label>List of notes</label>
                  <ListNoteEdit
                    notes={this.state.customer.notes}
                    errors={errors}
                  />
                </div>
                <div className="form-control w-100">
                  <label>List of addresses</label>
                  <ListAddressesEdit
                    addresses={this.state.customer.addressesList}
                    errors={errors}
                  />
                </div>
                <div className="m-5">
                  <button
                    type="submit"
                    className="btn btn-success "
                    disabled={!formik.isValid || !formik.dirty}
                    id="btnSave"
                  >
                    Save
                  </button>
                  <Link to={"/"} className="btn btn-info m-2">
                    Return
                  </Link>
                </div>
                <Errors value={apiManager.errorsOfData} />
              </Form>
              <Modal
                visible={this.state.modalVisible}
                title={this.state.modalTitle}
                content={this.state.modalContent}
                footer={
                  <div>
                    <Link to={"/"} className="btn btn-info m-2">
                      Return List
                    </Link>
                    <button
                      className="btn btn-secondary"
                      onClick={this.onCloseModal}
                    >
                      OK
                    </button>
                  </div>
                }
                onClose={this.onCloseModal}
              />
            </>
          );
        }}
      </Formik>
    );
  }
}

export default CustomerEdit;
