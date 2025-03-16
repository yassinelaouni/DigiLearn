import { useState, useEffect, useCallback } from "react";

import actions from "../../../actions";
import { useDispatch } from "react-redux";
import errors from "../../../../../store/errors";
import helpers from "../../../../../helpers";

export default function useSearchRating() {
    const dispatch = useDispatch();

    // cleanup errors
    useEffect(() => {
        dispatch(errors.actions.cleaned());
    }, []);

    const [client, setclient] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    });

    const [clientId, setclientId] = useState("")

    const [selectedOption, setSelectedOption] = useState("haveId");

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setCanSearch(false);
        setclientId("");
        setclient({
            firstName: "",
            lastName: "",
            phone: ""
        });
    };
    const handleChangeclientId = (event) => {
        setclientId(event.target.value);
    }

    const handleChange = useCallback((event) => setclient(current => ({
        ...current,
        [event.target.name]: event.target.value
    })), []);

    // validate input
    const [localErrors, setLocalErrors] = useState({
        firstName: null,
        lastName: null,
        phone: null,
        clientId: null
    })
    useEffect(() => {
        if (!helpers.validator.isEmptyString(client.firstName) && !helpers.validator.isName(client.firstName))
            setLocalErrors((current) => ({ ...current, firstName: "Enter a valid first name" }));
        else setLocalErrors((current) => ({ ...current, firstName: null }));

        if (!helpers.validator.isEmptyString(client.lastName) && !helpers.validator.isName(client.lastName))
            setLocalErrors((current) => ({ ...current, lastName: "Enter a valid last name" }));
        else setLocalErrors((current) => ({ ...current, lastName: null }));

        if (!helpers.validator.isEmptyString(client.phone) && !helpers.validator.isMobilePhone(client.phone))
            setLocalErrors((current) => ({ ...current, phone: "Enter a valid phone number" }));
        else setLocalErrors((current) => ({ ...current, phone: null }));

        if (!helpers.validator.isEmptyString(clientId) && !helpers.validator.isVerificationCode(clientId))
            setLocalErrors((current) => ({ ...current, clientId: "Enter a valid client ID" }));
        else setLocalErrors((current) => ({ ...current, clientId: null }));
    }, [client, clientId]);

    // track search abillity
    const [canSearch, setCanSearch] = useState(false);
    useEffect(() => {
        if (
            !helpers.validator.isEmptyString(client.firstName) &&
            !helpers.validator.isEmptyString(client.lastName) &&
            !helpers.validator.isEmptyString(client.phone) &&
            !localErrors.firstName &&
            !localErrors.lastName &&
            !localErrors.phone
        ) setCanSearch(true);
        else if (!helpers.validator.isEmptyString(clientId) && !localErrors.clientId) setCanSearch(true);

        else setCanSearch(false);
    }, [client, localErrors]);

    const setNull = useCallback(() => dispatch(actions.selectedSet({ id: null })), [canSearch]);


    const handleSearch = useCallback(() => dispatch(actions.getOne({ ...client, clientId: clientId === "" ? null : clientId })), [client]);

    return {
        client,
        clientId,
        handleChange,
        handleSearch,
        selectedOption,
        handleOptionChange,
        handleChangeclientId,
        canSearch,
        setNull,
        errorsMessages: localErrors,
        isErrors: {
            firstName: localErrors.firstName ? true : false,
            lastName: localErrors.lastName ? true : false,
            phone: localErrors.phone ? true : false,
            clientId: localErrors.clientId ? true : false
        }
    };
}