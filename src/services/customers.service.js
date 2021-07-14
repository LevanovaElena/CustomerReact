export function getAllCustomers (idCustomer) {
    const url = idCustomer
        ? `http://localhost:4000/customers/${idCustomer}`
        : `http://localhost:4000/customers/`
    return fetch(url).then(result => {
        return result.json();
    })
}

export function deleteCustomer (idCustomer) {
    const url = `http://localhost:4000/customers/${idCustomer}`

    return fetch(url,{method:"DELETE",mode: 'cors'})
        .then(result => {
        return result.json();
    }).catch(()=>console.log("Error Delete"))
}