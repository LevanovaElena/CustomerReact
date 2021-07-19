import React from "react";
import {Field} from "formik";

export class NoteEdit extends React.Component {

    render() {
        return (
            <Field
                id="email"
                name="email"
                placeholder="firstname@google.com"
                type="email"
                className="form-control"
            />



        )
    }
};

export  default NoteEdit;