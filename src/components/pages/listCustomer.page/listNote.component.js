import React from "react";

export class ListNotes extends React.Component {
    renderList() {
        return (
                this.props.notes.map((note,index) => {
                    return <tr key={index}><td >{note.note}</td></tr>;
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