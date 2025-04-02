import types from '../../actionsTypes'

export default function get({ filter, meta = {} } = {}) {
	return {
		type: types.get,
		payload: { filter },
		meta: { id: types.get, ...meta },
	}
}
