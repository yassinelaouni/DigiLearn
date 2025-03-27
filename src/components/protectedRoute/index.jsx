import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "../../features/auth/selectors";
import helpers from "../../helpers";

export default function ProtectedRoute ({ children }) {
    const navigate = useNavigate();
    const token = useSelector(authSelectors.token);
    
    useEffect(() => {
      if(!token || helpers.validator.isEmptyString(token)) navigate('/');
    }, [token, navigate]);
        
    return <React.Fragment>{children} </React.Fragment>;
}