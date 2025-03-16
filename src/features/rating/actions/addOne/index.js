import types from "../../actionsTypes";

export default function addOne({
  firstName,
  lastName,
  phone,
  city,
  email,
  orderValue,
  punctuality,
  communication,
  orderCancellation,
  packageReturn,
  clientId,
  meta = {}
}) {
  return {
    type: types.addOne,
    payload: {
      firstName,
      lastName,
      phone,
      city,
      email,
      orderValue: Number(orderValue),
      punctuality,
      communication,
      orderCancellation,
      packageReturn,
      clientId,
    },
    meta: { id: types.addOne, ...meta },
  };
}
