import React from "react";
import ReactDOM from "react-dom";
import App from "../../src/components/App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

it("Should Render Correct", () => {
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
  require("../index.js");

  expect(ReactDOM.render).toHaveBeenCalledWith(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    div
  );
});
