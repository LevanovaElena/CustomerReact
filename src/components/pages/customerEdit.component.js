import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import {
  getCustomer,
  updateCustomer,
  createCustomer,
} from "../../services/customers.service";
import { Link } from "react-router-dom";
import SignupSchema from "../common/validationSchema";
import Customer from "../common/customerObject";
import Modal from "../common/modalWindow.component";
import { apiManager } from "../common/apiManager";
import { Errors } from "../common/error.component";

export class CustomerEdit extends React.Component {
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
    getCustomer(this.idCustomer, apiManager).then((data) => {
      if (!data) this.viewModal("Loading customer data", "Customer not found!");
      else this.setState({ customer: data, isLoaded: true });
    });
  }

  updateData(values) {
    updateCustomer(this.idCustomer, values, apiManager).then((result) => {
      if (!result)
        this.viewModal("Updating customer data", "Customer was not saved!");
      else this.viewModal("Updating customer data", "Customer was saved!");
    });
  }

  createData(values) {
    createCustomer(values, apiManager)
      .then((result) => {
        if (!result)
          this.viewModal("Saving of customer", "Customer was not saved!");
        else this.viewModal("Save of customer", "Customer was saved!");
      })
      .catch((error) => this.viewModal("Error!", "Not Found Error"));
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
        onSubmit={(values) => {
          let isChange = this.state.isNewCustomer;
          if (!isChange) {
            for (let key in values) {
              if (values[key] !== this.state.customer[key]) {
                isChange = true;
                break;
              }
            }
          }
          if (isChange) {
            if (!this.state.isNewCustomer)
              this.updateData(JSON.stringify(values, null, 2));
            else this.createData(JSON.stringify(values, null, 2));
          } else
            this.viewModal(
              "Updating customer data",
              "Customer was not change! Make changes."
            );
        }}
      >
        {(formik) => {
          //console.log('Formik props', formik)

          const { errors, touched } = formik;
          return (
            <React.Fragment>
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
                    <div className="small text-danger">
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

                  <FieldArray name="notes">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { notes } = values;
                      /*                     console.log("fieldArrayProps", fieldArrayProps);
                      console.log("Form errors", form.errors);
                      console.log("Notes", notes);*/
                      return (
                        <div>
                          {notes.map((note, index) => (
                            <div key={index}>
                              <Field name={`notes[${index}].note`} />
                              {errors.notes != null &&
                              errors.notes[index] != null ? (
                                <div className="small text-danger">
                                  {errors.notes[index].note}
                                </div>
                              ) : null}
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success m-1"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </button>
                              )}
                            </div>
                          ))}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="form-control w-100">
                  <label>List of addresses</label>
                  <FieldArray name="addressesList">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { addressesList } = values;
                      // console.log('fieldArrayProps', fieldArrayProps)
                      // console.log('Form errors', form.errors)
                      return (
                        <div>
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th scope="col">addressLine</th>
                                <th scope="col">addressLine</th>
                                <th scope="col">typeAddress</th>
                                <th scope="col">city</th>
                                <th scope="col">postalCode</th>
                                <th scope="col">state</th>
                                <th scope="col">country</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {addressesList.map((phNumber, index) => (
                                <tr key={index}>
                                  <td className="w-25">
                                    <Field
                                      name={`addressesList[${index}].addressLine`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {
                                          errors.addressesList[index]
                                            .addressLine
                                        }
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="w-25">
                                    <Field
                                      name={`addressesList[${index}].addressLine2`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {
                                          errors.addressesList[index]
                                            .addressLine2
                                        }
                                      </div>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Field
                                      name={`addressesList[${index}].typeAddress`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {
                                          errors.addressesList[index]
                                            .typeAddress
                                        }
                                      </div>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Field
                                      name={`addressesList[${index}].city`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {errors.addressesList[index].city}
                                      </div>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Field
                                      name={`addressesList[${index}].postalCode`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {errors.addressesList[index].postalCode}
                                      </div>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Field
                                      name={`addressesList[${index}].state`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {errors.addressesList[index].state}
                                      </div>
                                    ) : null}
                                  </td>
                                  <td>
                                    <Field
                                      name={`addressesList[${index}].country`}
                                      type="text"
                                      className="form-control"
                                    />
                                    {errors.addressesList != null &&
                                    errors.addressesList[index] != null ? (
                                      <div className="small text-danger">
                                        {errors.addressesList[index].country}
                                      </div>
                                    ) : null}
                                  </td>

                                  <td>
                                    {index > 0 && (
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-success m-1"
                                        onClick={() => remove(index)}
                                      >
                                        -
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="m-5">
                  <button
                    type="submit"
                    className="btn btn-success "
                    disabled={!formik.isValid}
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
            </React.Fragment>
          );
        }}
      </Formik>
    );
  }
}

export default CustomerEdit;
