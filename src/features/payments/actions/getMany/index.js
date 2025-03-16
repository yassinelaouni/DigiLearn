import types from '../../actionsTypes'

export default function getMany({ meta = {} } = {}) {
	return {
		type: types.getMany,
		meta: { id: types.getMany, ...meta },
	}
}
