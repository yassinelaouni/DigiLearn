import { useState, useEffect } from "react";

import helpers from "../../../../helpers";
import actions from "../../actions";
import types from "../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import errors from "../../../../store/errors";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentURL = window.location.href;
  let isAdmin

  if (currentURL === 'http://localhost:8080/login' || currentURL === 'http://localhost:8081/login') {
    // URL is http://localhost:3000/
    isAdmin = false

  } else if (currentURL === 'http://localhost:8080/admin' || currentURL === 'http://localhost:8081/admin') {
    // URL is http://localhost:3000/admin
    isAdmin = true
  } else {
    isAdmin = false
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) =>
    setData((current) => ({
      ...current,
      [event?.target?.name]: event?.target?.value,
    }));

  // validate data
  const [localeErrors, setLocalErrors] = useState({
    email: null,
    password: null
  });
  useEffect(() => {
    if (!helpers.validator.isEmptyString(data.email) && !helpers.validator.isEmail(data.email))
      setLocalErrors((current) => ({ ...current, email: "Enter a valid email" }));
    else setLocalErrors((current) => ({ ...current, email: null }));

    if (!helpers.validator.isEmptyString(data.password) && !helpers.validator.isPassword(data.password))
      setLocalErrors((current) => ({ ...current, password: "Enter a valid password" }));
    else setLocalErrors((current) => ({ ...current, password: null }));
  }, [data]);

  const handleLogin = () => {
    dispatch(actions.login({ ...data, meta: { isAdmin } }))
  }


  // track login abillity
  const [canLogin, setCanLogin] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(data.email) &&
      !helpers.validator.isEmptyString(data.password) &&
      !localeErrors.email &&
      !localeErrors.password
    ) setCanLogin(true);
    else setCanLogin(false);
  }, [data, localeErrors]);

  // handle login success
  const { isSuccess, id } = useSelector(errors.selectors.error);
  useEffect(() => {
    if (isSuccess && id === types.login && isAdmin) navigate("/adminDashboard");   
    if (isSuccess && id === types.login && !isAdmin) navigate("/");
  }, [isSuccess, id, navigate, isAdmin]);

  // navigate to login page
  const gotoRegisterPage = () => navigate("/signup")

  // navigate to forgot password page
  const gotoForgotPasswordPage = () => navigate("/forgot-password");

  return {
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    data,
    canLogin,
    handleLogin,
    gotoRegisterPage,
    gotoForgotPasswordPage,
    errorsMessages: localeErrors,
    isErrors: {
      email: localeErrors.email ? true : false,
      password: localeErrors.password ? true : false,
    }
  }
}