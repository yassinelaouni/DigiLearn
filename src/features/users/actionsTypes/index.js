const user = "user ::: ";

export default Object.freeze({
    // for saga
    get: `${user}get`, 
    remove: `${user}remove`,


    // for reducer
    selectedSet: `${user}selected-set`,
    merged: `${user}merged`,
    updated: `${user}updated`,
}); 