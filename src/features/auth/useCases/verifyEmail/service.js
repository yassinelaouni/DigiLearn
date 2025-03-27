import { useState, useEffect } from "react";

import helpers from "../../../../helpers";
import actions from "../../actions";
import types from "../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import errors from "../../../../store/errors";

export default function useVerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, [dispatch]);

  const [code, setCode] = useState("");

  const handleChange = (event) => setCode(event.target.value);

  // handle verify click
  const handleVerifyEmail = () =>
    dispatch(
      actions.verifyEmail({ code })
    );

  // handle verify click
  const handleResendCode = () =>
    dispatch(
      actions.resendCode()
    );

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

  // handle success
  const { isSuccess, id } = useSelector(errors.selectors.error);

  useEffect(() => {
    if (isSuccess && id === types.verifyEmail) navigate("/dashboard");
  }, [isSuccess, id, navigate]);

  return {
    code,
    isError: localeError ? true : false,
    errorMessage: localeError,
    canVerify,
    handleChange,
    handleVerifyEmail,
    handleResendCode
  }
}