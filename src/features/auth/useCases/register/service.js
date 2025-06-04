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
      setLocalErrors((current) => ({ ...current, email: "Entrez un email valide" }));
    else setLocalErrors((current) => ({ ...current, email: null }));

    if (!helpers.validator.isEmptyString(data.password) && !helpers.validator.isPassword(data.password))
      setLocalErrors((current) => ({ ...current, password: "Le mot de passe doit contenir au moins 8 caractères" }));
    else setLocalErrors((current) => ({ ...current, password: null }));

    if (!helpers.validator.isEmptyString(data.passwordConfirmation) && data.password !== data.passwordConfirmation)
      setLocalErrors((current) => ({ ...current, passwordConfirmation: "Les mots de passe ne correspondent pas" }));
    else setLocalErrors((current) => ({ ...current, passwordConfirmation: null }));

    if (!helpers.validator.isEmptyString(data.firstName) && !helpers.validator.isName(data.firstName))
      setLocalErrors((current) => ({ ...current, firstName: "Entrez un prénom valide" }));
    else setLocalErrors((current) => ({ ...current, firstName: null }));

    if (!helpers.validator.isEmptyString(data.lastName) && !helpers.validator.isName(data.lastName))
      setLocalErrors((current) => ({ ...current, lastName: "Entrez un nom valide" }));
    else setLocalErrors((current) => ({ ...current, lastName: null }));

    if (!helpers.validator.isEmptyString(data.phone) && !helpers.validator.isPhone(data.phone))
      setLocalErrors((current) => ({ ...current, phone: "Entrez un numéro de téléphone valide" }));
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
      !helpers.validator.isEmptyString(data.lastName) &&  // Remove phone check
      !localeErrors.email &&
      !localeErrors.password &&
      !localeErrors.passwordConfirmation &&
      !localeErrors.firstName &&
      !localeErrors.lastName;  // Remove phone error check

    setCanRegister(canRegister);
  }, [data, localeErrors]);

  // handle register click
  const handleRegister = () => {
    dispatch(actions.register({ ...data }));
    navigate("/")
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