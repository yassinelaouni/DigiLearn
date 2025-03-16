export default function getInitialState({ emptyState, mockingState }) {
	const emptyStateCases = ['production', 'staging']

	const defaultEnv = process.env.NODE_ENV
	const customEnv = process.env.REACT_APP_ENVIRONMENT

	return emptyStateCases.includes(defaultEnv) ||
		emptyStateCases.includes(customEnv)
		? emptyState
		: mockingState
}
