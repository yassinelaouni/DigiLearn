import { useState, useEffect } from "react";

import helpers from "../../../../../helpers";
import actions from "../../../actions";
import types from "../../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import errors from "../../../../../store/errors";

export default function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const showPasswordHandler = () => setShowPassword((show) => !show);
  const passwordMouseDownHandler = (event) => {
    event.preventDefault();
  };
  const showPassworConfirmationdHandler = () => setShowPasswordConfirmation((show) => !show);
  const passwordConfirmationMouseDownHandler = (event) => {
    event.preventDefault();
  };

  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, []);

  const [data, setData] = useState({
    password: "",
    passwordConfirmation: ""
  });

  const handleChange = (event) =>
    setData((current) => ({
      ...current,
      [event?.target?.name]: event?.target?.value,
    }));

  // validate data
  const [localeErrors, setLocaleErrors] = useState({
    password: null,
    passwordConfirmation: null
  });
  useEffect(() => {
    if (!helpers.validator.isEmptyString(data.password) && !helpers.validator.isPassword(data.password))
      setLocaleErrors((current) => ({ ...current, password: "Enter a valid password" }));
    else setLocaleErrors((current) => ({ ...current, password: null }));

    if (
      !helpers.validator.isEmptyString(data.passwordConfirmation) &&
      !helpers.validator.isPasswordMatch({ password: data.password, confirmPassword: data.passwordConfirmation })
    )
      setLocaleErrors((current) => ({ ...current, passwordConfirmation: "Passwords does not match" }));
    else setLocaleErrors((current) => ({ ...current, passwordConfirmation: null }));
  }, [data]);


  // track reset abillity
  const [canReset, setCanReset] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(data.password) &&
      !helpers.validator.isEmptyString(data.passwordConfirmation) &&
      !localeErrors.passwordConfirmation &&
      !localeErrors.password
    ) setCanReset(true);
    else setCanReset(false);
  }, [data, localeErrors]);

  // handle reset click
  const handleResetPassword = () => dispatch(actions.resetPassword({ ...data }));

  // handle success
  const { isSuccess, id } = useSelector(errors.selectors.error);
  useEffect(() => {
    if (isSuccess && id === types.resetPassword) navigate("/dashboard");
  }, [isSuccess, id, navigate]);


  return {
    showPassword,
    showPasswordConfirmation,
    data,
    canReset,
    isErrors: {
      password: localeErrors.password ? true : false,
      passwordConfirmation: localeErrors.passwordConfirmation ? true : false
    },
    errorsMessages: localeErrors,
    handleChange,
    showPasswordHandler,
    passwordMouseDownHandler,
    handleResetPassword,
    showPassworConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
  }
}