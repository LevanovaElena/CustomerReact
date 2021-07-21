import React, { useEffect, useState } from "react";
import { apiManager } from "./apiManager";

export const Errors = (errorsOld) => {
  const [errors, setErrors] = useState([]);
  apiManager.errorsOfData = errorsOld.value;
  useEffect(() => {
    apiManager.on("apiError", (error) => {
      setErrors(apiManager.errorsOfData);
    });
  }, []);

  return (
    <ul>
      {errors.map((error, index) => {
        return (
          <li key={index}>
            {
              <div>
                <span>{error.message}</span>
                <span>{error.stack}</span>
              </div>
            }
          </li>
        );
      })}
    </ul>
  );
};
