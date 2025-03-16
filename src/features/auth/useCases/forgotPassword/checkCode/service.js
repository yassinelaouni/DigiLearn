import { useState, useEffect } from "react";

import helpers from "../../../../../helpers";
import actions from "../../../actions";
import types from "../../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import errors from "../../../../../store/errors";
import selectors from "../../../selectors"

import useStepper from "../main"

export default function useCheckCode() {
  const dispatch = useDispatch();
  const { email } = useSelector(selectors.user)

  const { gotoLastStep } = useStepper();

  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, [dispatch]);

  const [code, setCode] = useState("");
  const handleChange = (event) => setCode(event.target.value);

  // validate code
  const [localeError, setLocaleError] = useState(null);
  useEffect(() => {
    if (!helpers.validator.isEmptyString(code) && !helpers.validator.isVerificationCode(code))
      setLocaleError("Enter a valid verification code");
    else setLocaleError(null);
  }, [code]);

  // track verify action abilily
  const [canVerify, setCanVerify] = useState(false);
  useEffect(() => {
    if (!helpers.validator.isEmptyString(code) && !localeError) setCanVerify(true);
    else setCanVerify(false);
  }, [code, localeError]);

  // handle check email click
  const handleCheck = () =>
    dispatch(
      actions.checkCode({ code, email })
    );

  // handle success
  const { isSuccess, id } = useSelector(errors.selectors.error);

  useEffect(() => {
    if (isSuccess && id === types.checkCode) gotoLastStep();
  }, [isSuccess, id]);

  return {
    code,
    isError: localeError ? true : false,
    errorMessage: localeError,
    canVerify,
    handleChange,
    handleCheck
  }
}