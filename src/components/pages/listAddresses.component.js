import React from "react";

export class ListAddresses extends React.Component {
  renderList() {
    const addresses = this.props.value;

    return addresses.map((address, index) => {
      return (
        <tr key={index}>
          <td>{address.addressLine}</td>
          <td>{address.addressLine2}</td>
          <td>{address.city}</td>
          <td>{address.postalCode}</td>
          <td>{address.state}</td>
          <td>{address.country}</td>
          <td>{address.typeAddress}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table table-light table-bordered m-0 table-sm">
        {/*                <thead className="text-muted small fs-6">
                <tr>
                    <th scope="col" className="d-none">_id</th>
                    <th scope="col">addressLine</th>
                    <th scope="col">addressLine2</th>
                    <th scope="col">typeAddress</th>
                    <th scope="col">city</th>
                    <th scope="col">postalCode</th>
                    <th scope="col">state</th>
                    <th scope="col">country</th>
                </tr>
                </thead>*/}
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  }
}

export default ListAddresses;
