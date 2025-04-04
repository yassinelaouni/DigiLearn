import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actions from '../../../actions'
import selectors from '../../../selectors'

const initialState = {
	remove: false,
	reject: false,
}

export default function useMain() {
	const dispatch = useDispatch()
	const paymentsIds = useSelector(selectors.filteredIds)
	const [isOpenModal, setModal] = useState(initialState)
	const [paymentId, setPaymentId] = useState(null)

	// get payments' ids
	useEffect(() => {
		dispatch(actions.get())
	}, [])

	const handleModalOpen = useCallback(
		({ type, id }) => {
			dispatch(actions.selectedSet({ id }))
			setPaymentId(id)
			setModal({ ...initialState, [type]: true })
		},
		[initialState, dispatch]
	)

	const handleModalClose = useCallback(
		() => setModal(initialState),
		[initialState]
	)

	return {
		ids: paymentsIds,
		isOpenModal,
		paymentId,
		handleModalOpen,
		handleModalClose,
	}
}
