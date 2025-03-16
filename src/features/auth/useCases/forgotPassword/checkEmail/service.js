import { useState, useEffect } from "react";

import helpers from "../../../../../helpers";
import actions from "../../../actions";
import types from "../../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import errors from "../../../../../store/errors";

import useStepper from "../main/service"

export default function useCheckEmail() {
  const dispatch = useDispatch();

  const { gotoSecondStep } = useStepper();

  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, []);

  const [email, setEmail] = useState("");

  // validate email
  const [localeError, setLocaleError] = useState(null);
  useEffect(() => {
    if (!helpers.validator.isEmptyString(email) && !helpers.validator.isEmail(email))
      setLocaleError("Enter a valid email");
    else setLocaleError(null);
  }, [email]);

  // track check action abilily
  const [canCheck, setCanCheck] = useState(false);
  useEffect(() => {
    if (!helpers.validator.isEmptyString(email) && !localeError) setCanCheck(true);
    else setCanCheck(false);
  }, [email, localeError]);

  const handleChange = (event) => setEmail(event.target.value);


  // handle check email click
  const handleCheck = () =>
    dispatch(
      actions.checkEmail({ email })
    );

  // handle success
  const { isSuccess, id } = useSelector(errors.selectors.error);

  useEffect(() => {
    if (isSuccess && id === types.checkEmail) gotoSecondStep();
  }, [isSuccess, id]);

  return {
    email,
    isError: localeError ? true : false,
    errorMessage: localeError,
    canCheck,
    handleChange,
    handleCheck
  }
}