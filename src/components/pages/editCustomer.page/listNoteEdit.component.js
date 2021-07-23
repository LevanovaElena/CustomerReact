import React from "react";
import { Field, FieldArray } from "formik";

function ListNoteEdit({ errors, touched, fieldArrayProps, notes }) {
  return (
    <FieldArray name="notes">
      {(fieldArrayProps) => {
        const { push, remove, form } = fieldArrayProps;
        const { values } = form;
        const { notes } = values;

        return (
          <div>
            {notes.map((note, index) => (
              <div key={index}>
                <Field name={`notes[${index}].note`} />
                {errors.notes != null && errors.notes[index] != null ? (
                  <div className="small text-danger">
                    {errors.notes[index].note}
                  </div>
                ) : null}
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-sm btn-success m-1"
                    onClick={() => remove(index)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => push("")}>
              +
            </button>
          </div>
        );
      }}
    </FieldArray>
  );
}

export default ListNoteEdit;
