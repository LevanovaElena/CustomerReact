import React from "react";
import ListNotes from './listNote.component';
import {Link} from "react-router-dom";
import ListAddresses from "./listAddresses.component";

class CustomerRow extends React.Component{

    render() {
        let customer=this.props.value;
        const keys=Object.keys(customer);
        const listRows = keys.map((propName,index) => {
                switch (propName) {
                    case "notes":
                        return <td key={index.toString()}><ListNotes notes={customer.notes}/></td>;
                    case "addressesList":
                        return <td key={index.toString()}><ListAddresses value={customer.addressesList}/></td>;
                    case "__v":
                        return <td key={index.toString()}><Link to={`/delete/${customer._id}`}>delete</Link> | <Link to={`/edit/${customer._id}`}>edit</Link></td>;
                    case "_id":
                        return <td className='d-none' key={index.toString()}>{customer[propName]}</td>;
                    default:
                        return <td key={index.toString()}>{customer[propName]}</td>;
                }
            }
        );

        return <tr>{listRows}</tr>;

    }
}

export default CustomerRow;