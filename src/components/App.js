import React from "react";
import ListCustomers from "../components/pages/listCustomers.component";
import CustomerEdit from "../components/pages/customerEdit.component";
import DeleteCustomer from "./pages/deleteCustomer.component";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link active">
                    Customer List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/edit/new"} className="nav-link active">
                    Create customer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/products"} className="nav-link active">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route
            path="/edit/:id"
            render={(props) => <CustomerEdit {...props} />}
          ></Route>
          <Route path="/products">
            <CustomerEdit />
          </Route>
          <Route exact path="/">
            <ListCustomers />
          </Route>
          <Route
            path="/delete/:id"
            render={(props) => <DeleteCustomer {...props} />}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
