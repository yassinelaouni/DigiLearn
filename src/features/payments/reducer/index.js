import types from '../actionsTypes'
import { produce } from 'immer'
import helpers from '../../../helpers'
import initialState from '../initialState'

const reducer = (state = initialState, action) => {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			case types.merged:
				if (
					// helpers.validator.isObject(payload?.many) &&
					!helpers.validator.isEmptyObject(payload?.many)
				)
					Object.entries(payload?.many).forEach(([id, one]) => {
						if (
							!helpers.validator.isEmptyObject(one) &&
							!helpers.validator.isEmptyString(id)
						)
							draft.all[id] = one
					})
				break

			case types.statusUpdated:
				const { status } = payload;
				if (
					// helpers.validator.isObject(draft.all[payload.paymentId]) &&
					!helpers.validator.isEmptyString(status)
				) {
					console.log("update statsu", payload.paymentId)
					draft.all[payload.paymentId].status = status;
				}
				break;

			case types.updated:
				if (
					helpers.validator.isObject(payload?.one) &&
					!helpers.validator.isEmptyObject(payload?.one) &&
					!helpers.validator.isEmptyString(payload?.one?.id)
				)
					draft.payments[payload.one.id] = payload.one
				break

			case types.selectedSet:
				draft.selected = payload?.id
				break

			case types.removed:
				if (!helpers.validator.isEmptyString(payload?.paymentId)) {
					delete draft.all[payload.paymentId]
					if (draft.selected === payload.paymentId) draft.selected = null
				}
				break

			case types.filterUpdated:
				draft.filter = { ...draft.filter, ...payload }
				break

			default:
				break
		}
	})
}

export default reducer
