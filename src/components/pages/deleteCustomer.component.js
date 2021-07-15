import React from "react";
import {Link} from "react-router-dom";
import {deleteCustomer} from "../../services/customers.service";



class DeleteCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isDelete: false};


        this.handleClickDelete = this.handleClickDelete.bind(this);

    }

    handleClickDelete() {
        const id= this.props.match.params.id;
        this.deleteData(id);

    }

    deleteData(id) {

        deleteCustomer(id).then(data => {
            console.log(data);

        });

    }

    render() {
        return (

            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Delete customer</h5>
                    <p className="card-text">Are you sure you want to delete customer?</p>
                    <button className="btn btn-danger m-5" onClick={this.handleClickDelete}>
                        Delete
                    </button>
                    <Link to={'/'} className="btn btn-info m-5">Return</Link>
                </div>
            </div>


        );
    }
}
export default DeleteCustomer;

