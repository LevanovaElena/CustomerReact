import CustomerRow from "./CustomerRow";
import { getCustomer } from "../../services/customers.service";
import React from "react";
import Modal from "../common/modalWindow.component";

export class ListCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomers: [],
      isLoaded: false,
      isModal: true,
    };
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal() {
    this.setState((prevState) => ({
      isModal: !prevState.isModal,
    }));
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const query = "";
    getCustomer(query).then((data) => {
      if (data) this.setState({ listCustomers: data.docs, isLoaded: true });
      else this.setState({ listCustomers: null, isLoaded: true });
    });
  }

  renderList() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else if (this.state.isLoaded && this.state.listCustomers === null) {
      return (
        <div>
          <h2>No Customers</h2>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <table className="table">
            <caption className="caption">Customers</caption>
            <thead>
              <tr>
                <th scope="col" className="d-none">
                  Id
                </th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">TPA</th>
                <th scope="col">Notes</th>
                <th scope="col">Addresses</th>
                <th scope="col"> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listCustomers.map((customer, index) => {
                return <CustomerRow key={index} value={customer} />;
              })}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
  render() {
    return <div className="container-fluid">{this.renderList()}</div>;
  }
}

export default ListCustomers;
