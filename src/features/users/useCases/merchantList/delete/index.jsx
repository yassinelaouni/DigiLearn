import Components from "../../../../../components";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import actions from "../../../actions";


export default function Delete({ open, handleCancel, id, pageName = "" }) {
    const userId = id
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(actions.remove({ userId }));
        handleCancel();
        if (pageName === "detailed") navigate(-1);
    };

    return (
        <Components.ConfirmAction
            open={open}
            handleCancel={handleCancel}
            handleConfirm={handleDelete}
            message="Are you sure you want to delete this user"
        />
    );
}