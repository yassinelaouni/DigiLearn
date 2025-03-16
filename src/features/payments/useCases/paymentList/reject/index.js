import { useDispatch } from "react-redux";
import Components from "components";
import actions from "../../../actions";

export default function Reject({ open, handleCancel, paymentId }) {
  const dispatch = useDispatch();

  const handleReject = () => {
    dispatch(actions.changeStatus({ paymentId, status: "rejected" }));
    handleCancel();
  };

  return (
    <Components.ConfirmAction
      open={open}
      handleCancel={handleCancel}
      handleConfirm={handleReject}
      withReason={true}
    />
  );
}
