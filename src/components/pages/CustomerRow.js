import React from "react";
import Item from './Item';

class CustomerRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render() {
        let customer=this.props.value;
        let row=[];
        for(let propName in customer) {
            row.push(<Item value={customer[propName]}/>);
            console.log(customer[propName]);
        }
        const keys=Object.keys(customer);
        const listRows = keys.map((propName) => {
                if (propName === "notes" || propName === "addressesList") return <td></td>;
                if (propName === "__v" ) return <td><a href='#'>delete</a>|<a href='#'>edit</a></td>;
                else if (propName === "totalPurchasesAmount" ) return <td>{customer[propName]["$numberDecimal"]}</td>
                else return <td>{customer[propName]}</td>
            }

        );

        return <tr>{listRows}</tr>;

    }
}

export default CustomerRow;