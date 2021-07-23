import React from "react";
import { Link, Redirect } from "react-router-dom";
import { deleteCustomer } from "../../services/customers.service";
import { apiManager } from "../../services/apiManager";
import { Errors } from "../common/error.component";

class DeleteCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDelete: false };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  handleClickDelete() {
    const id = this.props.match.params.id;
    this.deleteData(id);
  }

  deleteData(id) {
    deleteCustomer(id).then((data) => {
      console.log(data);
      if (data) {
        this.setState({ isDelete: true });
        return <Redirect to="/" />;
      }
    });
  }

  render() {
    if (this.state.isDelete) return <Redirect to="/" />;
    else
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Delete customer</h5>
            <p className="card-text">
              Are you sure you want to delete customer?
            </p>
            <button
              id="btnDelete"
              className="btn btn-danger m-5"
              onClick={this.handleClickDelete}
            >
              Delete
            </button>
            <Link to={"/"} className="btn btn-info m-5">
              Return
            </Link>
          </div>
          <Errors value={apiManager.errorsOfData} />
        </div>
      );
  }
}
export default DeleteCustomer;
