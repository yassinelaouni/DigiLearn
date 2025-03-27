import React from "react";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from "@mui/material";

import useStepper from "./service";
import CheckEmail from "../checkEmail";
import CheckCode from "../checkCode";
import ResetPassword from "../resetPassword";
import styles from "./styles";

export default function ForgotPasswordMain() {
  const { step, gotoLoginPage, gotoSecondStep, gotoLastStep } = useStepper();

  const steps = [
    {
      label: "Check email",
      content: <CheckEmail gotoSecondStep={gotoSecondStep} />,
    },
    {
      label: "Check code",
      content: <CheckCode gotoLastStep={gotoLastStep} />,
    },
    { label: "Reset password", content: <ResetPassword /> },
  ];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 30 }}
    >
      {/** Navigate to login action */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={styles.actionsContainer}
      >
        <Stepper activeStep={step - 1} alternativeLabel style={{ width: "100%" }}>
          {steps.map((stepLabel) => (
            <Step key={stepLabel.label}>
              <StepLabel>{stepLabel.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {steps.map((stepLabel, index) => (
          step === index + 1 && (
            <Grid
              container
              key={stepLabel.label} // Add a unique key here
              style={{
                marginTop: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: 22,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="GrayText">
                  You remember the password?
                </Typography>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  style={{ marginLeft: 20 }}
                  onClick={gotoLoginPage}
                >
                  Login
                </Button>
              </div>
              {stepLabel.content}
            </Grid>
          )
        ))}
      </Grid>
    </Grid>
  );
}