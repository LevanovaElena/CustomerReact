import React from "react";
import { Formik, Field, Form } from 'formik';
import {getCustomer,updateCustomer,createCustomer} from "../../services/customers.service";
import {Link} from "react-router-dom";


export class CustomerEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            isLoaded: this.props.match.params.id==='new'?true:false,
            isNewCustomer:this.props.match.params.id==='new'?true:false
        }

    }


    componentDidMount() {
        if(!this.state.isNewCustomer)this.getData();
    }

    getData() {
        getCustomer(this.props.match.params.id).then(data => {
            this.setState({customer: data, isLoaded: true});
        });
    }

    updateData(values){
          updateCustomer(this.props.match.params.id,values).then(()=>{
            alert("Customer was saved!")
        });
    }

    createData(values){
        console.log(values);
        createCustomer(values).then(()=>{
            alert("Customer was saved!")
        });
    }
    render() {

        if (!this.state.isLoaded) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }
        return <Formik
            initialValues={{
                firstName:!this.state.isNewCustomer?this.state.customer.firstName:"" ,
                lastName: !this.state.isNewCustomer?this.state.customer.lastName:"",
                email: !this.state.isNewCustomer?this.state.customer.email:"",
                phoneNumber: !this.state.isNewCustomer?this.state.customer.phoneNumber:"",
                totalPurchasesAmount: !this.state.isNewCustomer?this.state.customer.totalPurchasesAmount:"",
            }}
            onSubmit={(values) =>  {
                if(!this.state.isNewCustomer)this.updateData(JSON.stringify(values, null, 2));
                else this.createData(JSON.stringify(values, null, 2));
            }}

            >
            <Form className="m-5 w-50">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Field id="firstName" name="firstName" placeholder="First Name" className="form-control"/>

                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Last Name"  className="form-control"/>

                <label htmlFor="email" className="form-label">Email</label>
                <Field
                    id="email"
                    name="email"
                    placeholder="firstname@google.com"
                    type="email"
                    className="form-control"
                />
                <label htmlFor="phoneNumber" className="form-label">phoneNumber</label>
                <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+7000 000 000"
                    type="phone"
                    className="form-control"
                />
                <label htmlFor="totalPurchasesAmount" className="form-label">totalPurchasesAmount</label>
                <Field
                    id="totalPurchasesAmount"
                    name="totalPurchasesAmount"
                    type="number"
                    className="form-control"
                />
                <div className="mt-5">
                    <button type="submit" className="btn btn-success ">Save</button>
                    <Link to={'/'} className="btn btn-info m-2">Return</Link>
                </div>

            </Form>
        </Formik>;



    }
}
export default CustomerEdit;