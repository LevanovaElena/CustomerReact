import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email"),
  phoneNumber: Yup.string().matches(/^\+[1-9]\d{10,14}$/, {
    message: "Phone Number is not correct",
    excludeEmptyString: true,
  }),
  totalPurchasesAmount: Yup.number(),
  notes: Yup.array().of(
    Yup.object().shape({
      note: Yup.string()
        .min(3, "At least 3 characters!")
        .max(60, "Maximum 100 characters")
        .required("Обязательное поле")
        .default(""),
    })
  ),
  addressesList: Yup.array().of(
    Yup.object().shape({
      addressLine: Yup.string()
        .min(3, "At least 3 characters")
        .max(100, "Maximum 100 characters")
        .required("Required!")
        .default(""),
      addressLine2: Yup.string()
        .min(3, "At least 3 characters")
        .max(100, "Maximum 100 characters")
        .default(""),
      typeAddress: Yup.mixed()
        .oneOf(
          ["Billing", "Shipping"],
          "Should accept only Billing or Shipping"
        )
        .required("Required!"),
      city: Yup.string()
        .min(2, "At least 3 characters")
        .max(50, "Maximum 100 characters")
        .required("Required!")
        .default(""),
      postalCode: Yup.string()
        .min(3, "At least 3 characters")
        .max(6, "Maximum 100 characters")
        .required("Required!")
        .default(""),
      state: Yup.string()
        .min(3, "At least 3 characters")
        .max(20, "Maximum 100 characters")
        .required("Required!")
        .default(""),
      country: Yup.mixed()
        .oneOf(
          ["Canada", "United States"],
          "Should accept only United States or Canada"
        )
        .required("Required!"),
    })
  ),
});

export default SignupSchema;
