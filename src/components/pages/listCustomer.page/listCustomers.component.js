import CustomerRow from "./CustomerRow";
import { getCustomer } from "../../../services/customers.service";
import React from "react";
import { Errors } from "../../common/error.component";
import { apiManager } from "../../../services/apiManager";
import Pagination from "../../common/pagination.component";

export class ListCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomers: [],
      isLoaded: false,
    };
    this.skip = "0";
    this.limit = this.props.limit;
  }

  componentDidMount() {
    this.getData({ skip: this.skip, limit: this.limit });
  }

  getData(query) {
    getCustomer("", query).then((data) => {
      if (data) this.setState({ listCustomers: data.docs, isLoaded: true });
      //else this.setState({ listCustomers: [], isLoaded: true });
    });
  }

  renderList() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h2>Loading...</h2>
          <Errors value={apiManager.errorsOfData} />
        </div>
      );
    } else if (this.state.isLoaded && this.state.listCustomers.length === 0) {
      return (
        <div>
          <h2>No Customers</h2>
          <Errors value={apiManager.errorsOfData} />
        </div>
      );
    } else {
      return (
        <>
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
          <Pagination />
          <Errors value={apiManager.errorsOfData} />
        </>
      );
    }
  }
  render() {
    return <div className="container-fluid">{this.renderList()}</div>;
  }
}

export default ListCustomers;
