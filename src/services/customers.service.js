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

export function getCustomer(idCustomer){
    const url = `http://localhost:4000/customers/${idCustomer}`

    return fetch(url,{method:"GET",mode: 'cors'})
        .then(result => {
            return result.json();
        }).catch(()=>console.log("Error Get Customer"))
}
export function updateCustomer(idCustomer,body){
    const url = `http://localhost:4000/customers/${idCustomer}`;
    console.log("body",body);
    return fetch(url,{
        method:"PUT",
        mode: 'cors',
        body:body,
        headers: {
        'Content-Type': 'application/json'
        }})
        .then(result => {
            console.log(result.json());
            return result.json();

        }).catch(()=>console.log("Error Update Customer"))
}

export function createCustomer(body){
    const url = `http://localhost:4000/customers/`;
    console.log("body",body);
    return fetch(url,{
        method:"POST",
        mode: 'cors',
        body:body,
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(result => {
            console.log(result.json());
            return result.json();

        }).catch(()=>console.log("Error Create Customer"))
}