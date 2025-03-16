import { memoize } from 'proxy-memoize'
import selectAll from '../all'

export default memoize(({ state, id }) => {
	const all = selectAll(state)

	return all[id] ?? {}
})
