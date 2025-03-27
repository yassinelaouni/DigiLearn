import Components from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../actions";
import detailedSelected from '../../../selectors/detailedSelected'

export default function ChangeStatus({ open, handleCancel, id }) {
    const dispatch = useDispatch();

    const handleDeactivate = () => {
        dispatch(actions.changeStatus({ merchantId: id, status: 'Inactive' }))
        handleCancel();
    };

    return (
        <Components.ConfirmAction
            open={open}
            handleCancel={handleCancel}
            handleConfirm={handleDeactivate}
            message={`Are you sure about changing the status of this merchant to Inactive`}
        />
    );
}