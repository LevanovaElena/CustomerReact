import React from "react";
import ListNotes from './listNote.component';
import {Link} from "react-router-dom";
import ListAddresses from "./listAddresses.component";

class CustomerRow extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let customer=this.props.value;///*<ListCustomers addresses={customer.addressesList}/>*/
        const keys=Object.keys(customer);
        const listRows = keys.map((propName) => {
                switch (propName) {
                    case "notes":
                        return <td><ListNotes notes={customer.notes}/></td>;
                        break;
                    case "addressesList":
                        return <td><ListAddresses value={customer.addressesList}/></td>;
                        break;
                    case "__v":
                        return <td><Link to={`/delete/${customer._id}`}>delete</Link> | <Link to={`/edit/${customer._id}`}>edit</Link></td>;
                        break;
                    case "_id":
                        return <td className='d-none'>{customer[propName]}</td>;
                        break;
                    case "totalPurchasesAmount":
                        return <td>{customer[propName]["$numberDecimal"]}</td>;
                        break;
                    default:
                        return <td>{customer[propName]}</td>;
                        break;
                }
            }
        );

        return <tr>{listRows}</tr>;

    }
}

export default CustomerRow;