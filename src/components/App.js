import logo from '../logo.svg';
import '../css/App.css';
import CustomerRow from '../components/CustomerRow';
import listCustomers from '../data';

function App() {
    const listRows = listCustomers.map((customer) =>
        <CustomerRow key={customer.idCustomer.toString()} value={customer} />
    );
    console.log("listRows",listRows);
  return (
    <div className="container-fluid">
      <table className="table">
          <thead>
          <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">TPA</th>
              <th scope="col">Notes</th>
              <th scope="col">Addresses</th>
              <th scope="col"> Actions</th>
          </tr>
          </thead>
          <tbody>

              {listRows}

          </tbody>
      </table>
    </div>
  );
}

export default App;
