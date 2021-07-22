import React from "react";
import ListNotes from "./listNote.component";
import { Link } from "react-router-dom";
import ListAddresses from "./listAddresses.component";

class CustomerRow extends React.Component {
  render() {
    let customer = this.props.value;

    return (
      <tr>
        <td> {customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.email}</td>
        <td>{customer.phoneNumber}</td>
        <td>{customer.totalPurchasesAmount}</td>
        <td>
          <ListNotes notes={customer.notes} />
        </td>
        <td>
          <ListAddresses value={customer.addressesList} />
        </td>
        <td>
          <Link to={`/delete/${customer._id}`}>delete</Link> |{" "}
          <Link to={`/edit/${customer._id}`}>edit</Link>
        </td>
      </tr>
    );
  }
}

export default CustomerRow;
