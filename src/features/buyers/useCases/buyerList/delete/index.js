import Components from "components";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import actions from "features/buyers/actions";


export default function Delete({ open, handleCancel, id, pageName = "" }) {
    const merchantId = id
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(actions.remove({ merchantId }));
        handleCancel();
        if (pageName === "detailed") navigate(-1);
    };

    return (
        <Components.ConfirmAction
            open={open}
            handleCancel={handleCancel}
            handleConfirm={handleDelete}
            message="Are you sure you want to delete this buyer"
        />
    );
}