let mockListCustomers = [
  {
    _id: 1,
    firstName: "Ivan",
    lastName: "Ivanov",
    phoneNumber: "+73456635231",
    email: "ivan@gmail.com",
    totalPurchasesAmount: 12,
    notes: [{ note: "note1" }, { note: "note2" }, { note: "note3" }],
    addressesList: [
      {
        _id: 1,
        addressLine: "Address1",
        addressLine2: "Address2",
        typeAddress: "Billing",
        city: "City",
        postalCode: "123456",
        state: "State",
        country: "Canada",
      },
      {
        _id: 2,
        addressLine: "Address21",
        addressLine2: "Address22",
        typeAddress: "Billing",
        city: "City2",
        postalCode: "123456",
        state: "State2",
        country: "Canada",
      },
    ],
  },
  {
    //данные с ошибками - всего их 12
    _id: 2,
    firstName: "I",
    lastName: "",
    phoneNumber: "+7345663523",
    email: "ivanka@gmailcom",
    totalPurchasesAmount: "b",
    notes: [{ note: "" }, { note: "note2" }, { note: "note3" }],
    addressesList: [
      {
        idAddress: 1,
        addressLine: "",
        addressLine2: "",
        typeAddress: "Billkkking",
        city: "",
        postalCode: "",
        state: "",
        country: "Canajjjda",
      },
    ],
  },
];

export default mockListCustomers;
