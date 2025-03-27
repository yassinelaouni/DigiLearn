import { useState, useEffect } from "react";
import helpers from "../../../../helpers";
import actions from "../../actions";
import types from "../../actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import selectAuthMerchant from "../../../../features/auth/selectors/user";
import selectOneById from "../../selectors/oneById";
import getInitialState from "../../initialState";
import errors from "../../../../store/errors";


export default function useProfile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [idMerchant, setIdMerchant] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [websites, setWebsites] = useState([]);
  const { id } = useSelector((state) => {
    return selectAuthMerchant(state);
  });
  useEffect(() => {
    dispatch(actions.get())
  }, [id])
  const selectedMerchant = useSelector((state) => {
    return selectOneById({ state, id: id }) ?? selectAuthMerchant(state);;
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = selectedMerchant;

        if (
          data?.id &&
          data?.lastName &&
          data?.firstName &&
          data?.email &&
          data?.phone &&
          data?.websites
        ) {
          setIdMerchant(data.id);
          setLastName(data.lastName);
          setFirstName(data.firstName);
          setEmail(data.email);
          setPhone(data.phone);
          setWebsites(data.websites);
          setLoading(false);
          return; // Exit the effect early
        }

        // If the condition is not true, continue fetching data
        fetchData();
      } catch (error) {
        console.error("Error fetching merchant data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMerchant]);



  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [showInputField, setShowInputField] = useState(false);

  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isWebsiteEdit, setIsWebsiteEdit] = useState(false);

  const [editingWebsiteId, setEditingWebsiteId] = useState(false);

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
  const showWebSiteEdit = () => setIsWebsiteEdit((edit) => !edit);


  // cleanup errors
  useEffect(() => {
    dispatch(errors.actions.cleaned());
  }, [dispatch]);

  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirmation: ""
  });

  const [newWebsiteUrl, setNewWebsiteUrl] = useState('')
  const [editingWebsiteUrl, setEditingWebsiteUrl] = useState('')


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

  const handleAddWebsite = (event) => {
    setNewWebsiteUrl(event.target.value)
  };

  const handleSaveWebsite = () => {
    setShowInputField(false);
    setNewWebsiteUrl('');
    dispatch(actions.addWebsite({
      merchantId: idMerchant, url: newWebsiteUrl
    }))
  };

  const handleEditWebsite = (id) => {
    setIsWebsiteEdit(true);
    setEditingWebsiteId(id);
    const editingWebsite = websites.find((website) => website.id === id);
    const editingWebsiteUrl = editingWebsite ? editingWebsite.url : undefined;
    setEditingWebsiteUrl(editingWebsiteUrl);

  };

  const handleChangeWebsite = (event) => {
    const { value } = event.target;
    setEditingWebsiteUrl(value)
    setWebsites((prevWebsites) => {
      const updatedWebsites = prevWebsites.map((website) => {
        if (website.id === editingWebsiteId) {
          return {
            ...website,
            url: value
          };
        }
        return website;
      });
      return updatedWebsites;
    });
  };

  const handleDeleteWebsite = (id) => {
    dispatch(actions.deleteWebsite({
      merchantId: idMerchant, websiteId: id
    }))
    // just be faster
    setWebsites((prevWebsites) => {
      const updatedWebsites = prevWebsites.filter((website) => website.id !== id);
      return updatedWebsites;
    });
  };

  const showAddWebsiteHandler = () => setShowInputField(true);

  // validate data
  const [localeErrors, setLocalErrors] = useState({
    passwordOld: null,
    passwordNew: null,
    passwordConfirmation: null,
    phone: null,
    website: null
  });
  useEffect(() => {
    if (!helpers.validator.isEmptyString(newWebsiteUrl) && !helpers.validator.isWebsite(newWebsiteUrl))
      setLocalErrors((current) => ({ ...current, website: "Invalid website url. Please try again." }));
    else setLocalErrors((current) => ({ ...current, website: null }));

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
  }, [password.old, password.new, password.confirmation, phone, newWebsiteUrl]);

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

  // track website abillity
  const [canWebsite, setCanWebsite] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(newWebsiteUrl) &&
      !localeErrors.website
    ) setCanWebsite(true);
    else setCanWebsite(false);
  }, [newWebsiteUrl, localeErrors]);

  // track website abillity
  const [canChangeWebsite, setCanChangeWebsite] = useState(false);
  useEffect(() => {
    if (
      !helpers.validator.isEmptyString(editingWebsiteUrl) &&
      !localeErrors.website
    ) setCanChangeWebsite(true);
    else setCanChangeWebsite(false);
  }, [editingWebsiteUrl, localeErrors]);

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

  const handleChangePasswordDispatch = () => {
    setPassword(resetPassword())
    dispatch(actions.changePassword({
      merchantId: idMerchant, password: password.new
    }))
  }

  const handleChangePhoneDispatch = () => {
    dispatch(actions.changePhone({ merchantId: idMerchant, phone }))
    setIsPhoneEdit(false);
  }

  const handleChangeWebsiteDispatch = () => {
    dispatch(actions.updateWebsite({
      merchantId: idMerchant, websiteId: editingWebsiteId, url: editingWebsiteUrl
    }))
    setIsWebsiteEdit(false);
  }


  return {
    isPhoneEdit,
    isWebsiteEdit,
    editingWebsiteId,
    showPasswordOld,
    showPasswordNew,
    showPasswordConfirmation,
    password,
    phone,
    lastName,
    firstName,
    email,
    websites,
    loading,
    canChangePassword,
    canChangePhone,
    canWebsite,
    canChangeWebsite,
    handleChangePassword,
    handleChangePhone,
    handleAddWebsite,
    handleSaveWebsite,
    handleEditWebsite,
    handleDeleteWebsite,
    handleChangeWebsite,
    showAddWebsiteHandler,
    showPasswordOldHandler,
    showPasswordNewHandler,
    showPhoneEdit,
    showWebSiteEdit,
    showInputField,
    passwordOldMouseDownHandler,
    passwordNewMouseDownHandler,
    showPasswordConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
    handleChangePasswordDispatch,
    handleChangePhoneDispatch,
    handleChangeWebsiteDispatch,
    errorsMessages: localeErrors,
    isErrors: {
      passwordOld: localeErrors.passwordOld ? true : false,
      passwordNew: localeErrors.passwordNew ? true : false,
      passwordConfirmation: localeErrors.passwordConfirmation ? true : false,
      phone: localeErrors.phone ? true : false,
      website: localeErrors.website ? true : false,
    }
  }
}