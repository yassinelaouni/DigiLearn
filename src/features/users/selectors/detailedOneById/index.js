import { memoize } from 'proxy-memoize'
import selectOneById from '../oneById'
import helpers from 'helpers'
import moment from 'moment'

const detailedOneById = memoize(({ state, id }) => {
    const client = selectOneById({ state, id })

    if (
        !helpers.validator.isObject(client) ||
        helpers.validator.isEmptyObject(client)
    )
        return null

    let result = {
        ...client,
        nationality: helpers.getStatus(client.nationality),
        fullName: `${client.firstName ?? ''}  ${client.lastName ?? ''}`,
        balance: `${client.balance ?? ''}  ${client.currency ?? ''}`,
        birthday: helpers.dateTime.getDate(client.birthday),
        lastLoginAt: `${helpers.dateTime.getDate(
            client.lastLoginAt
        )}  ${helpers.dateTime.getTime(client.lastLoginAt)}`,
        createdAt: `${helpers.dateTime.getDate(
            client.addedAt
        )},  ${helpers.dateTime.getTime(client.addedAt)}`,
    }

    if (
        helpers.validator.isArray(client.identity) &&
        !helpers.validator.isEmptyArray(client.identity)
    ) {
        const lastUploadedIdentity = client.identity[0]

        if (helpers.validator.isObject(lastUploadedIdentity)) {
            result = {
                ...result,
                identity: {
                    ...lastUploadedIdentity,
                    values:
                        !lastUploadedIdentity.front && !lastUploadedIdentity.back
                            ? null
                            : [lastUploadedIdentity.front, lastUploadedIdentity.back],
                    isExpired: moment(lastUploadedIdentity.expiresAt).isAfter(Date.now),
                    isExist: lastUploadedIdentity.front || lastUploadedIdentity.back,
                    isAccepted: lastUploadedIdentity.isAccepted,
                },
            }
            result = {
                ...result,
                identity: {
                    ...result.identity,
                    isRejected:
                        result.identity.isExist &&
                        !result.identity.isAccepted &&
                        !helpers.validator.isEmptyString(result.identity.rejected),
                },
            }
            result = {
                ...result,
                identity: {
                    ...result.identity,
                    reason: result.identity.isRejected
                        ? result.identity.rejected ?? null
                        : null,
                    isInreview:
                        result.identity.isExist &&
                        !result.identity.isAccepted &&
                        !result.identity.isRejected &&
                        !result.identity.isExpired,
                },
            }
        }
    }

    if (
        helpers.validator.isArray(client.profile) &&
        !helpers.validator.isEmptyArray(client.profile)
    ) {
        const lastUploadedProfile = client.profile[0]

        if (helpers.validator.isObject(lastUploadedProfile)) {
            result = {
                ...result,
                profile: {
                    photo: lastUploadedProfile.value,
                    isAccepted: lastUploadedProfile.isAccepted,
                    isRejected:
                        lastUploadedProfile.value &&
                        !lastUploadedProfile.isAccepted &&
                        !helpers.validator.isEmptyString(lastUploadedProfile.rejected),
                },
            }
            result = {
                ...result,
                profile: {
                    ...result.profile,
                    reason: result.profile.isRejected
                        ? lastUploadedProfile.rejected ?? null
                        : null,
                    isInreview:
                        result.profile.photo &&
                        !result.profile.isAccepted &&
                        !result.profile.isRejected,
                },
            }
        }
    }

    if (
        helpers.validator.isArray(client.phone) &&
        !helpers.validator.isEmptyArray(client.phone)
    ) {
        const lastPhone = client.phone[0]

        if (helpers.validator.isObject(lastPhone)) {
            result = {
                ...result,
                phone: {
                    value: lastPhone.value,
                    isVerified: !helpers.validator.isEmptyString(lastPhone.verifiedAt),
                },
            }
        }
    }

    if (
        helpers.validator.isArray(client.email) &&
        !helpers.validator.isEmptyArray(client.email)
    ) {
        const lastEmail = client.email[0]

        if (helpers.validator.isObject(lastEmail)) {
            result = {
                ...result,
                email: {
                    value: lastEmail.value,
                    isVerified: !helpers.validator.isEmptyString(lastEmail.verifiedAt),
                },
            }
        }
    }

    result = {
        ...result,
        account: {
            isActive: helpers.getStatus(client.status) === 'active',
            isVerified:
                result.email?.isVerified &&
                result.phone?.isVerified &&
                result.profile?.isAccepted &&
                result.identity?.isAccepted,
            isInreview: result.identity?.isInreview || result.profile?.isInreview,
        },
    }

    return result
})

export default detailedOneById