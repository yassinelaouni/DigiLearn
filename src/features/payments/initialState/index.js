import mockingData from './mockingData'
import helpers from 'helpers'

const emptyState = {
	all: {},
	selected: null,
	filter: {
		limit: 12,
		page: 1,
		status: 'inreview',
	},
}

const mockingState = {
	...emptyState,
	all: mockingData,
}

// console.log("pyment data :", mockingState ?? {})

export default emptyState //mockingState
