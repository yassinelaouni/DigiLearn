import { memoize } from 'proxy-memoize'
import selectOneById from '../oneById'
import helpers from '../../../../helpers'
import detailedSelected from '../../../../features/merchants/selectors/oneById'

const detailedOneById = memoize(({ state, id }) => {
	if (!id) return null

	const payment = selectOneById({ state, id })

	if (helpers.validator.isEmptyObject(payment)) return null
	if (!payment.creator || helpers.validator.isEmptyString(payment.creator))
		return null

	const creator = detailedSelected({
		state,
		id: payment.creator,
	})
	// console.log("creator :", creator)

	if (!creator) return null

	let result = {
		...payment,
		creator: {
			id: payment.creator,
			fullName: creator.firstName + " " + creator.lastName,
			photo: creator.profile?.photo,
		},
		amount: `${payment.amount}  ${creator.currency}`,
		createdAt: `${helpers.dateTime.getDate(
			payment.createdAt
		)}  ${helpers.dateTime.getTime(payment.createdAt)}`,
		status: helpers.getStatus(payment.status),
	}

	result = {
		...result,
		isApproved: result.status === 'approved',
		isInreview: result.status === 'inreview',
		isRejected: result.status === 'rejected',
		isDeleted: result.status === 'deleted',
	}

	return result
})

export default detailedOneById
