import React from "react";
import { Field, FieldArray } from "formik";

function ListAddressesEdit({ errors }) {
  return (
    <FieldArray name="addressesList">
      {(fieldArrayProps) => {
        const { push, remove, form } = fieldArrayProps;
        const { values } = form;
        const { addressesList } = values;
        // console.log('fieldArrayProps', fieldArrayProps)
        // console.log('Form errors', form.errors)
        return (
          <div>
            <table className="table table-sm">
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
                    <td className="w-25">
                      <Field
                        name={`addressesList[${index}].addressLine`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].addressLine}
                        </div>
                      ) : null}
                    </td>
                    <td className="w-25">
                      <Field
                        name={`addressesList[${index}].addressLine2`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].addressLine2}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Field
                        name={`addressesList[${index}].typeAddress`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].typeAddress}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Field
                        name={`addressesList[${index}].city`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].city}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Field
                        name={`addressesList[${index}].postalCode`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].postalCode}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Field
                        name={`addressesList[${index}].state`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].state}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Field
                        name={`addressesList[${index}].country`}
                        type="text"
                        className="form-control"
                      />
                      {errors.addressesList != null &&
                      errors.addressesList[index] != null ? (
                        <div className="small text-danger">
                          {errors.addressesList[index].country}
                        </div>
                      ) : null}
                    </td>

                    <td>
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-success m-1"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={() => push("")}>
              +
            </button>
          </div>
        );
      }}
    </FieldArray>
  );
}

export default ListAddressesEdit;
