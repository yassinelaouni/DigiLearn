import types from "../../actionsTypes";

export default function register({ email, password, firstName, lastName, phone, websites, meta = {} }) {
  return {
    type: types.register,
    payload: {
      email,
      password,
      firstName,
      lastName,
      phone
    },
    meta: { id: types.register, ...meta },
  };
}
