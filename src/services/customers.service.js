export function getAllCustomers (idCustomer) {
    const url = idCustomer
        ? `http://localhost:4000/customers/${idCustomer}`
        : `http://localhost:4000/customers/`
    return fetch(url).then(result => {
        return result.json();
    })
}