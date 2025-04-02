const prodState = {
	selected: null,
	all: {},
	filter: {},
}

const testState = () => prodState

export default function getInitialState() {
	return process.env.NODE_ENV === 'production' ? prodState : testState()
}
