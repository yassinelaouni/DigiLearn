import { useState, useEffect } from "react";
import helpers from "../../../../helpers";
import actions from "../../actions";
import types from "../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import errors from "../../../../store/errors";

export default function useRegister() {
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
  }, [dispatch]);

  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (event, index) => {
    setData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  // validate data
  const [localeErrors, setLocalErrors] = useState({
    email: null,
    password: null,
    passwordConfirmation: null,
    firstName: null,
    lastName: null,
    phone: null
  });
  useEffect(() => {
    if (!helpers.validator.isEmptyString(data.email) && !helpers.validator.isEmail(data.email))
      setLocalErrors((current) => ({ ...current, email: "Enter a valid email" }));
    else setLocalErrors((current) => ({ ...current, email: null }));

    if (!helpers.validator.isEmptyString(data.password) && !helpers.validator.isPassword(data.password))
      setLocalErrors((current) => ({ ...current, password: "Enter a valid password" }));
    else setLocalErrors((current) => ({ ...current, password: null }));

    if (
      !helpers.validator.isEmptyString(data.passwordConfirmation) &&
      !helpers.validator.isPasswordMatch({ password: data.password, confirmPassword: data.passwordConfirmation })
    )
      setLocalErrors((current) => ({ ...current, passwordConfirmation: "Passwords does not match" }));
    else setLocalErrors((current) => ({ ...current, passwordConfirmation: null }));

    if (!helpers.validator.isEmptyString(data.firstName) && !helpers.validator.isName(data.firstName))
      setLocalErrors((current) => ({ ...current, firstName: "Enter a valid first name" }));
    else setLocalErrors((current) => ({ ...current, firstName: null }));

    if (!helpers.validator.isEmptyString(data.lastName) && !helpers.validator.isName(data.lastName))
      setLocalErrors((current) => ({ ...current, lastName: "Enter a valid last name" }));
    else setLocalErrors((current) => ({ ...current, lastName: null }));

    if (!helpers.validator.isEmptyString(data.phone) && !helpers.validator.isMobilePhone(data.phone))
      setLocalErrors((current) => ({ ...current, phone: "Enter a valid phone number" }));
    else setLocalErrors((current) => ({ ...current, phone: null }));

  }, [data]);

  // track login ability
  const [canRegister, setCanRegister] = useState(false);
  useEffect(() => {
    const canRegister =
      !helpers.validator.isEmptyString(data.email) &&
      !helpers.validator.isEmptyString(data.password) &&
      !helpers.validator.isEmptyString(data.passwordConfirmation) &&
      !helpers.validator.isEmptyString(data.firstName) &&
      !helpers.validator.isEmptyString(data.lastName) &&
      !helpers.validator.isEmptyString(data.phone) &&
      !localeErrors.email &&
      !localeErrors.password &&
      !localeErrors.passwordConfirmation &&
      !localeErrors.firstName &&
      !localeErrors.lastName &&
      !localeErrors.phone

    setCanRegister(canRegister);
  }, [data, localeErrors]);

  // handle register click
  const handleRegister = () => {
    dispatch(actions.register({ ...data }));
    navigate("/dashboard")
  };

  // handle success
  const { isSuccess, id } = useSelector(errors.selectors.error);
  useEffect(() => {
    if (isSuccess && id === types.register) navigate("/verify-email");
  }, [isSuccess, id, navigate]);

  // navigate to login page
  const gotoLoginPage = () => navigate("/login");

  return {
    showPassword,
    showPasswordConfirmation,
    data,
    canRegister,
    handleChange,
    showPasswordHandler,
    passwordMouseDownHandler,
    handleRegister,
    showPassworConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
    gotoLoginPage,
    errorsMessages: localeErrors,
    isErrors: {
      email: localeErrors.email ? true : false,
      password: localeErrors.password ? true : false,
      passwordConfirmation: localeErrors.passwordConfirmation ? true : false,
      firstName: localeErrors.firstName ? true : false,
      lastName: localeErrors.lastName ? true : false,
      phone: localeErrors.phone ? true : false,
    }
  };
}