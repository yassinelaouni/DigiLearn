import { useState, useEffect } from "react";
import authSelectors from "../../../../features/auth/selectors";
import { useSelector } from "react-redux";

export default function useRating() {
    const { balance } = useSelector(authSelectors.user)

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (balance <= 0) setValue("3");
    };
    const goToRate = () => {
        setValue("3");
    }
    useEffect(() => {
        if (balance <= 0) setValue("3");
    }, [balance])



    return {
        handleChange,
        balance,
        goToRate,
        setValue,
        value
    }
}