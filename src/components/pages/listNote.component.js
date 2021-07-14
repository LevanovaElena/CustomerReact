
import Item from './Item';
import React from "react";

export class ListNotes extends React.Component {
    constructor(props) {
        super(props);
    }
    renderList() {
        return (
                this.props.notes.map((note,index) => {
                    return <tr key={index}><Item value={note.note} /></tr>
                })
            )
    }
    render() {
        return (
            <table className="table table-bordered m-0 table-sm">
            <tbody>
                {
                    this.renderList()
                }
            </tbody>
            </table>
        )
    }
};

export  default ListNotes;