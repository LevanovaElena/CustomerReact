import React from "react";
import Nav from "./Nav";
import ListCustomers from "./ListCustomers";
import {CustomerEdit} from "./CustomerEdit";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: '123'}
    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link active">Customer List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/customer'} className="nav-link active">Create customer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/products'} className="nav-link active">Products</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Switch>
                    <Route path="/customer">
                        <CustomerEdit />
                    </Route>
                    <Route path="/products">
                        <CustomerEdit />
                    </Route>
                    <Route exact path="/" >
                        <ListCustomers/>
                    </Route>

                </Switch>
            </Router>
        );
    }
}

export  default App;
