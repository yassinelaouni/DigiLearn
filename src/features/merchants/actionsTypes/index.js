const MERCHANT = "merchant ::: ";

export default Object.freeze({
    // for saga
    changePassword: `${MERCHANT}change-password`,
    changePhone: `${MERCHANT}change-phone`,
    addWebsite: `${MERCHANT}add-website`,
    updateWebsite: `${MERCHANT}update-website`,
    deleteWebsite: `${MERCHANT}delete-website`,
    generateApiKey: `${MERCHANT}generate-api-key`,
    get: `${MERCHANT}get`,
    changeStatus: `${MERCHANT}change-status`,
    changeWebsiteStatus: `${MERCHANT}change-website-status`,
    changePaymentStatus: `${MERCHANT}change-payment-status`,
    changeApiKey: `${MERCHANT}change-api-key`,
    remove: `${MERCHANT}remove`,


    // for reducer
    selectedSet: `${MERCHANT}selected-set`,
    merged: `${MERCHANT}merged`,
    updated: `${MERCHANT}updated`,
    websiteAdded: `${MERCHANT}website-added`,
    websiteUpdated: `${MERCHANT}website-updated`,
    websiteDeleted: `${MERCHANT}website-deleted`,
    phoneUpdated: `${MERCHANT}phone-updated`,
    statusUpdated: `${MERCHANT}status-updated`,
    statusWebsiteUpdated: `${MERCHANT}status-website-updated`,
    deleted: `${MERCHANT}deleted`,
    filterChanged: `${MERCHANT}filter-changed`
});