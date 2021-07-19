import React from "react";
import {Formik, Field, Form, FieldArray} from 'formik';
import {getCustomer,updateCustomer,createCustomer} from "../../services/customers.service";
import {Link} from "react-router-dom";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email'),
    phoneNumber: Yup.string().matches(/^\+[1-9]\d{10,14}$/,{ message: "Phone Number is not correct", excludeEmptyString: true }),

});


export class CustomerEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            isLoaded: this.props.match.params.id==='new'?true:false,
            isNewCustomer:this.props.match.params.id==='new'?true:false,

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
                notes:!this.state.isNewCustomer?this.state.customer.notes:[{note:''}],
                addressesList:!this.state.isNewCustomer?this.state.customer.addressesList:[
                    {
                        addressLine:"",
                        addressLine2:"",
                        typeAddress:"",
                        city:"",
                        postalCode:"",
                        state:"",
                        country:""
                    }],
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) =>  {
                let isChange=false;
                for (let key in values){
                    if(values[key]!==this.state.customer[key]) {
                        isChange = true;
                        break;
                    }
                }
                if(isChange) {
                    if (!this.state.isNewCustomer) this.updateData(JSON.stringify(values, null, 2));
                    else this.createData(JSON.stringify(values, null, 2));
                }
                else alert("Customer did not change");
            }}

            >
            {formik => {
                //console.log('Formik props', formik)

                const {  errors, touched } = formik;
                return (
                    <Form >
                        <div className="m-5 w-50">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="First Name" className="form-control"/>
                            {errors.firstName && touched.firstName ? (
                                <div className="small text-danger">{errors.firstName}</div>
                            ) : null}

                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Last Name" className="form-control"/>
                            {errors.lastName && touched.lastName ? ( <div className="small text-danger">{errors.lastName}</div>) : null}

                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                id="email"
                                name="email"
                                placeholder="firstname@google.com"
                                type="email"
                                className="form-control"
                            />
                            {errors.email && touched.email ? <div className="small text-danger">{errors.email}</div> : null}

                            <label htmlFor="phoneNumber" className="form-label">phoneNumber</label>
                            <Field
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="+7000 000 000"
                                type="phone"
                                className="form-control"
                            />
                            {errors.phoneNumber && touched.phoneNumber ? <div className="small text-danger">{errors.phoneNumber}</div> : null}

                            <label htmlFor="totalPurchasesAmount" className="form-label">totalPurchasesAmount</label>
                            <Field
                                id="totalPurchasesAmount"
                                name="totalPurchasesAmount"
                                type="number"
                                className="form-control"
                            />
                            {errors.totalPurchasesAmount && touched.totalPurchasesAmount ? <div className="small text-danger">{errors.totalPurchasesAmount}</div> : null}
                        </div>
                        <div className='form-control m-5 w-75'>
                            <label>List of notes</label>
                                <FieldArray name="notes">
                                    {fieldArrayProps => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { notes } = values
                                        // console.log('fieldArrayProps', fieldArrayProps)
                                        // console.log('Form errors', form.errors)
                                        return (
                                            <div>
                                                {notes.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`notes[${index}].note`} />
                                                        {index > 0 && (
                                                            <button type='button' className="btn btn-sm btn-success m-1" onClick={() => remove(index)}>
                                                                -
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button type='button' onClick={() => push('')}>
                                                    +
                                                </button>
                                            </div>
                                        )
                                    }}
                                </FieldArray>
                        </div>
                        <div className='form-control m-5 w-100'>
                            <label>List of addresses</label>
                            <FieldArray name="addressesList">
                                {fieldArrayProps => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { addressesList } = values
                                    // console.log('fieldArrayProps', fieldArrayProps)
                                    // console.log('Form errors', form.errors)
                                    return (
                                        <div>
                                        <table className='table table-sm'>
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
                                                    <td>
                                                        <Field
                                                        name={`addressesList[${index}].addressLine`}
                                                        type="text"
                                                        className="form-control"
                                                        />
                                                    </td>
                                                    <td><Field
                                                        name={`addressesList[${index}].addressLine2`}
                                                               type="text"
                                                               className="form-control" /></td>
                                                    <td><Field
                                                        name={`addressesList[${index}].typeAddress`}
                                                               type="text"
                                                               className="form-control" /></td>
                                                    <td><Field
                                                        name={`addressesList[${index}].city`}
                                                               type="text"
                                                               className="form-control" /></td>
                                                    <td><Field
                                                        name={`addressesList[${index}].postalCode`}
                                                               type="text"
                                                               className="form-control"/></td>
                                                    <td><Field
                                                        name={`addressesList[${index}].state`}
                                                               type="text"
                                                               className="form-control" /></td>
                                                    <td><Field
                                                        name={`addressesList[${index}].country`}
                                                               type="text"
                                                               className="form-control"/></td>

                                                    <td>
                                                    {index > 0 && (
                                                        <button type='button' className="btn btn-sm btn-success m-1" onClick={() => remove(index)}>
                                                            -
                                                        </button>
                                                    )}</td>
                                                </tr>
                                            ))}
                                            </tbody>

                                        </table>
                                    <button type='button' onClick={() => push('')}>
                                        +
                                    </button>
                                    </div>
                                    )
                                }}
                            </FieldArray>
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-success " disabled={!formik.isValid}>Save</button>
                            <Link to={'/'} className="btn btn-info m-2">Return</Link>
                        </div>

                    </Form>
                )
            }}
        </Formik>


    }
}
export default CustomerEdit;