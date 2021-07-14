import CustomerRow from './CustomerRow';
import {getAllCustomers} from '../../services/customers.service';
import React from "react";

export class ListCustomers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listCustomers: [],
            isLoaded: false,
        }
        //this.onSearchChanged = this.onSearchChanged.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        this.getData();
    }

    componentDidMount() {
        console.log('start');
        this.getData();
    }

    getData() {
        //const searchParams = new URLSearchParams(this.props.location.search);
        const query = "";

        getAllCustomers(query).then(data => {
            this.setState({listCustomers: data, isLoaded: true});
        });

    }

    renderList() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        } else if (this.state.isLoaded && this.state.listCustomers.length === 0) {
            return (
                <div><h2>No Customers</h2></div>
            )
        } else {
            return (
                <table className="table ">
                    <thead>
                    <tr>
                        <th scope="col" className="d-none">Id</th>
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
                    {this.state.listCustomers.map((customer,index) => {
                        return <CustomerRow key={index} value={customer} />
                    })}
                    </tbody>
            </table>
            )
        }
    }
    render() {
        return (
            <div className="container-fluid">
                {
                    this.renderList()
                }
            </div>
        )
    }
}

export default ListCustomers;
