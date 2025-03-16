import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useStepper() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const gotoSecondStep = () => setStep(2);
  const gotoLastStep = () => setStep(3);


  // navigate to login page
  const gotoLoginPage = () => navigate("/");

  return {
    gotoSecondStep,
    gotoLastStep,
    step,
    setStep,
    gotoLoginPage
  };
}