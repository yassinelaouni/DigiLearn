import Components from "components";
import { useDispatch } from "react-redux";
import actions from "../../../actions";

export default function Remove({ open, handleCancel, paymentId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(actions.remove({ paymentId }));
    handleCancel();
  };

  return (
    <Components.ConfirmAction
      open={open}
      handleCancel={handleCancel}
      handleConfirm={handleDelete}
      message="Are you sure you want to delete this payment"
    />
  );
}
