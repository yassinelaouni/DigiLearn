import { useDispatch, useSelector } from 'react-redux'
import detailedSelected from '../../../selectors/detailedSelected'
import { useCallback, useState, useEffect } from 'react'
import actions from '../../../actions'
import { useNavigate } from 'react-router-dom'


const initialState = {
    openProfile: false,
    openIdentity: false,
    openDelete: false,
    openDeacivate: false,
    rejectWebsite: false,
}

export default function useDetailedclient() {
    const dispatch = useDispatch()

    const merchant = useSelector(detailedSelected);
    const navigate = useNavigate()

    const [modal, setModal] = useState(initialState)

    const handleModalOpen = useCallback(
        ({ type }) => {
            if (type === 'delete')
                setModal({ ...initialState, openDelete: true })
            else if (type === 'deactivate')
                setModal({ ...initialState, openDeacivate: true })
            else if (type === 'rejectWebsite')
                setModal({ ...initialState, rejectWebsite: true })
        },
        [initialState, dispatch]
    )

    const handleModalClose = useCallback(
        () => setModal(initialState),
        [initialState]
    )

    const handleActivitiStatusChnage = useCallback(
        e => {
            if (merchant?.status[0]?.value === "active") handleModalOpen({ type: 'deactivate' })
            else dispatch(actions.changeStatus({ merchantId: merchant?.id, status: 'active' }))
        },
        [handleModalOpen, merchant, dispatch]
    )

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate])

    return {
        merchant,
        handleModalOpen,
        handleModalClose,
        modal,
        handleActivitiStatusChnage,
        handleGoBack,
    }
}