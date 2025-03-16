import { useDispatch, useSelector } from 'react-redux'
import detailedSelected from 'features/buyers/selectors/detailedSelected'
import { useCallback, useState, useEffect } from 'react'
import actions from 'features/buyers/actions'
import { useNavigate } from 'react-router-dom'


const initialState = {
    openProfile: false,
    openIdentity: false,
    openDelete: false,
    openDeacivate: false,
}

export default function useDetailedclient() {
    const dispatch = useDispatch()

    const merchant = useSelector(detailedSelected);
    const navigate = useNavigate()
 
    const [modal, setModal] = useState(initialState)

    const handleModalOpen = useCallback(
        ({ type, open }) => {
            if (type === 'identity')
                setModal({ ...initialState, openIdentity: true && open })
            else if (type === 'profile')
                setModal({ ...initialState, openProfile: true && open })
            else if (type === 'delete')
                setModal({ ...initialState, openDelete: true })
            else if (type === 'deactivate')
                setModal({ ...initialState, openDeacivate: true })
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