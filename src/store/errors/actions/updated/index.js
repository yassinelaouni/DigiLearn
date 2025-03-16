import types from "../../actions-types";

export default function errorsUpdate({
  isSuccess = false,
  message = null,
  errors = {},
  id = "",
  statusCode = null,
  show = false,
}) {
  return {
    type: types.updated,
    payload: {
      isSuccess,
      message,
      errors,
      id,
      statusCode,
      show,
    },
  };
}
