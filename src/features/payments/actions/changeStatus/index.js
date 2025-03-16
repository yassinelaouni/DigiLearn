import types from '../../actionsTypes'

export default function changeStatus({ paymentId, status, meta = {} }) {
	return {
		type: types.changeStatus,
		payload: { paymentId, status },
		meta: { id: types.changeStatus, ...meta },
	}
}
