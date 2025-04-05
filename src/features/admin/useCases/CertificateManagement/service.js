import { useState, useEffect } from "react";
import helpers from "../../../../helpers";
// import actions from "../../actions";
// import types from "../../actions-types";
import { useDispatch } from "react-redux";
import errors from "../../../../store/errors";

export default function useRegister() {
  const dispatch = useDispatch();

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const [isPhoneEdit, setIsPhoneEdit] = useState(false);

  const showPasswordOldHandler = () => setShowPasswordOld((show) => !show);
  const passwordOldMouseDownHandler = (event) => {
    event.preventDefault();
  };

  const showPasswordNewHandler = () => setShowPasswordNew((show) => !show);
  const passwordNewMouseDownHandler = (event) => {
    event.preventDefault();
  };

  const showPasswordConfirmationdHandler = () => setShowPasswordConfirmation((show) => !show);
  const passwordConfirmationMouseDownHandler = (event) => {
    event.preventDefault();
  };


  const showPhoneEdit = () => setIsPhoneEdit((edit) => !edit);


  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, [dispatch]);

  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirmation: ""
  });

  const [phone, setPhone] = useState('+212655093497');




  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  };

  // validate data
  const [localeErrors, setLocalErrors] = useState({
    passwordOld: null,
    passwordNew: null,
    passwordConfirmation: null,
    phone: null
  });
  useEffect(() => {
    if (!helpers.validator.isEmptyString(password.old) && !helpers.validator.isPassword(password.old))
      setLocalErrors((current) => ({ ...current, passwordOld: "Invalid old password. Please try again." }));
    else setLocalErrors((current) => ({ ...current, passwordOld: null }));

    if (!helpers.validator.isEmptyString(password.new) && !helpers.validator.isPassword(password.new))
      setLocalErrors((current) => ({ ...current, passwordNew: "Please enter a valid password" }));
    else setLocalErrors((current) => ({ ...current, passwordNew: null }));

    if (
      !helpers.validator.isEmptyString(password.confirmation) &&
      !helpers.validator.isPasswordMatch({ password: password.new, confirmPassword: password.confirmation })
    )
      setLocalErrors((current) => ({ ...current, passwordConfirmation: "Passwords does not match. Please try again." }));
    else setLocalErrors((current) => ({ ...current, passwordConfirmation: null }));

    if (!helpers.validator.isEmptyString(phone) && !helpers.validator.isMobilePhone(phone))
      setLocalErrors((current) => ({ ...current, phone: "Please enter a valid phone number" }));
    else setLocalErrors((current) => ({ ...current, phone: null }));
  }, [password.old, password.new, password.confirmation, phone]);

  // track password change abillity
  const [canChangePassword, setCanChangePassword] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(password.old) &&
      !helpers.validator.isEmptyString(password.new) &&
      !helpers.validator.isEmptyString(password.confirmation) &&
      !localeErrors.passwordOld &&
      !localeErrors.passwordNew &&
      !localeErrors.passwordConfirmation
    ) setCanChangePassword(true);
    else setCanChangePassword(false);
  }, [password, localeErrors]);


  // track phone change abillity
  const [canChangePhone, setCanChangePhone] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(phone) &&
      !localeErrors.phone
    ) setCanChangePhone(true);
    else setCanChangePhone(false);
  }, [phone, localeErrors]);
  // to be deleted
  const resetPassword = () => {
    return {
      old: "",
      new: "",
      confirmation: ""
    };
  };

  const handleChangePasswordDispatch = () => setPassword(resetPassword());

  const handleChangePhoneDispatch = () => {
    setPhone(phone);
    setIsPhoneEdit(false);
  }

  return {
    isPhoneEdit,
    showPasswordOld,
    showPasswordNew,
    showPasswordConfirmation,
    password,
    phone,
    canChangePassword,
    canChangePhone,
    handleChangePassword,
    handleChangePhone,
    showPasswordOldHandler,
    showPasswordNewHandler,
    showPhoneEdit,
    passwordOldMouseDownHandler,
    passwordNewMouseDownHandler,
    showPasswordConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
    handleChangePasswordDispatch,
    handleChangePhoneDispatch,
    errorsMessages: localeErrors,
    isErrors: {
      passwordOld: localeErrors.passwordOld ? true : false,
      passwordNew: localeErrors.passwordNew ? true : false,
      passwordConfirmation: localeErrors.passwordConfirmation ? true : false,
      phone: localeErrors.phone ? true : false
    }
  }
}