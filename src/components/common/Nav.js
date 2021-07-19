
import {
    Link
} from "react-router-dom";



function Nav(){
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active">Customer List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/edit/new'} className="nav-link active">Create customer</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/products'} className="nav-link active">Products</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Nav;