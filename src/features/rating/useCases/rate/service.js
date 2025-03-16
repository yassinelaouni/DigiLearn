import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import actions from "../../actions";
import types from "../../actionsTypes";
import errors from "../../../../store/errors";
import helpers from "../../../../helpers"

export default function useRate() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errors.actions.cleaned());
    }, [dispatch]);

    const [selectedOption, setSelectedOption] = useState("haveId");

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        city: "Marrakech",
        email: "",
        // order info
        orderValue: "",
        punctuality: 0,
        communication: 0,
        orderCancellation: false,
        packageReturn: false
    });
    const [clientId, setclientId] = useState("")

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setShowOrderInfo(false);
        setclientId("");
        setData({
            firstName: "",
            lastName: "",
            phone: "",
            city: "Marrakech",
            email: "",
            orderValue: "",
            punctuality: 0,
            communication: 0,
            orderCancellation: false,
            packageReturn: false
        });
    };

    const handleChangeCity = (newValue) => {
        // to be change later
        setData((current) => {
            let result = { ...current };

            result["city"] = newValue;
            return result;
        });
    };

    const handleChange = (event) => {
        setData((current) => {
            let result = { ...current };

            result[event.target.name] = ["packageReturn", "orderCancellation"].includes(event.target.name)
                ? event.target.checked
                : ["punctuality", "communication"].includes(event.target.name)
                    ? Number(event.target.value)
                    : event.target.value;

            return result;
        });
    };
    useEffect(() => {
    }, [data.packageReturn]);

    const handleChangeclientId = (event) => {
        setclientId(event.target.value);
    }


    const handleRate = useCallback(() => {
        dispatch(actions.addOne({ ...data, clientId: clientId === "" ? null : clientId }))
        setclientId("");
        setData({
            firstName: "",
            lastName: "",
            phone: "",
            city: "Marrakech",
            email: "",
            orderValue: "",
            punctuality: 0,
            communication: 0,
            orderCancellation: false,
            packageReturn: false
        });
    }, [data, clientId]);// later

    // validate user data
    const [localeErrors, setLocaleErrors] = useState({
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        clientId: null
    });
    useEffect(() => {
        if (!helpers.validator.isEmptyString(data.firstName) && !helpers.validator.isName(data.firstName))
            setLocaleErrors((current) => ({ ...current, firstName: "Enter a valid first name" }));
        else setLocaleErrors((current) => ({ ...current, firstName: null }));

        if (!helpers.validator.isEmptyString(data.lastName) && !helpers.validator.isName(data.lastName))
            setLocaleErrors((current) => ({ ...current, lastName: "Enter a valid last name" }));
        else setLocaleErrors((current) => ({ ...current, lastName: null }));

        if (!helpers.validator.isEmptyString(data.phone) && !helpers.validator.isMobilePhone(data.phone))
            setLocaleErrors((current) => ({ ...current, phone: "Enter a valid phone number" }));
        else setLocaleErrors((current) => ({ ...current, phone: null }));

        if (!helpers.validator.isEmptyString(data.email) && !helpers.validator.isEmail(data.email))
            setLocaleErrors((current) => ({ ...current, email: "Enter a valid email address" }));
        else setLocaleErrors((current) => ({ ...current, email: null }));
        if (!helpers.validator.isEmptyString(clientId) && !helpers.validator.isVerificationCode(clientId))
            setLocaleErrors((current) => ({ ...current, clientId: "Enter a valid client ID" }));
        else setLocaleErrors((current) => ({ ...current, clientId: null }));
    }, [data, clientId]);

    // show/hide order info
    const [showOrderInfo, setShowOrderInfo] = useState(false)
    useEffect(() => {
        if (
            !helpers.validator.isEmptyString(data.firstName) &&
            !helpers.validator.isEmptyString(data.lastName) &&
            !helpers.validator.isEmptyString(data.phone) &&
            !helpers.validator.isEmptyString(data.city) &&
            !localeErrors.firstName &&
            !localeErrors.lastName &&
            !localeErrors.phone
        ) setShowOrderInfo(true);
        else if (!helpers.validator.isEmptyString(clientId) && !localeErrors.clientId) setShowOrderInfo(true);
        else setShowOrderInfo(false);
    }, [localeErrors, data, clientId]);

    // merge localeErrors & API errors

    // track rate abillity
    const [canRate, setCanRate] = useState(false)
    useEffect(() => {
        if (showOrderInfo && Number(data.orderValue) > 0) setCanRate(true);
        else setCanRate(false);
    }, [data.orderValue, showOrderInfo, clientId]);

    return {
        data,
        clientId,
        handleChange,
        handleChangeCity,
        handleChangeclientId,
        handleRate,
        selectedOption,
        handleOptionChange,
        showOrderInfo,
        canRate,
        errorsMessages: localeErrors,
        isErrors: {
            firstName: localeErrors.firstName ? true : false,
            lastName: localeErrors.lastName ? true : false,
            phone: localeErrors.phone ? true : false,
            email: localeErrors.email ? true : false,
            clientId: localeErrors.clientId ? true : false
        }
    };
}