import types from '../../actionsTypes'

export default function filterUpdated({ status, meta = {} }) {
	return {
		type: types.filterUpdated,
		payload: { status },
		meta,
	}
}
