import React from "react";


export class ListAddresses extends React.Component {

    renderList() {
        const addresses=this.props.value;

        return  addresses.map((address,index)=>{
            return <tr key={index.toString()}>{this.getRowAddress(address)}</tr>
        })

    }

    getRowAddress(address){
        const keys=Object.keys(address);
        return  keys.map((propName,index) => {
            if(propName==="_id")return <td className='d-none'  key={index.toString()}>{address[propName]}</td>;
            return <td key={index.toString()}>{address[propName]}</td>;
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
                <tbody>
                {
                    this.renderList()
                }
                </tbody>
            </table>
        )
    }
};

export  default ListAddresses;