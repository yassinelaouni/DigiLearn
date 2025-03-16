import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";

import styles from "../styles";
import useSearch from "./service";

export default function SearchRating() {
  const {
    client,
    clientId,
    handleChange,
    handleSearch,
    handleOptionChange,
    handleChangeclientId,
    selectedOption,
    canSearch,
    isErrors,
    errorsMessages,
    setNull
  } = useSearch();

  useEffect(() => {
    if (!canSearch) setNull()
  }, [canSearch]);

  return (
    <Grid
      item
      container
      xs={12}
      md={6}
      style={{ marginTop: 34 }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '65%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={selectedOption === "haveId"}
            onChange={() => handleOptionChange("haveId")}
            style={{
              appearance: 'none',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid #888',
              marginRight: '6px',
              cursor: 'pointer',
              backgroundColor: selectedOption === "haveId" ? '#1976D2' : 'transparent',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: '14px' }}>
            Have client's ID
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={selectedOption === "lackId"}
            onChange={() => handleOptionChange("lackId")}
            style={{
              appearance: 'none',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid #888',
              marginRight: '6px',
              cursor: 'pointer',
              backgroundColor: selectedOption === "lackId" ? '#1976D2' : 'transparent',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'normal', fontSize: '14px' }}>
            Lack client's ID
          </Typography>
        </div>
      </div>
      {selectedOption === "lackId" ? (
        <>
          {
            !canSearch && <>
              <Typography variant="body1" style={{ marginTop: 28, fontSize: "15px", color: "gray" }}>
                Enter client's data to initialize the search
              </Typography>
            </>
          }
          {/** first name input */}
          <TextField
            name="firstName"
            id="first-name-input"
            label="First name"
            variant="standard"
            size="small"
            value={client?.firstName}
            onChange={handleChange}
            style={styles.section}
            required
            error={isErrors.firstName}
            helperText={errorsMessages.firstName}
          />
          {/** last name input */}
          <TextField
            name="lastName"
            id="last-name-input"
            label="Last name"
            variant="standard"
            size="small"
            value={client?.lastName}
            onChange={handleChange}
            style={styles.section}
            required
            error={isErrors.lastName}
            helperText={errorsMessages.lastName}
          />
          {/** phone input */}
          <TextField
            name="phone"
            id="phone-input"
            label="Phone"
            variant="standard"
            size="small"
            value={client?.phone}
            onChange={handleChange}
            style={styles.section}
            required
            placeholder="+212 --- --- ---"
            error={isErrors.phone}
            helperText={errorsMessages.phone}
          />
        </>
      )
        :
        (<>
          {!canSearch && <>
            < Typography variant="body1" style={{ marginTop: 28, fontSize: "15px", color: "gray" }}>
              Enter client's ID to initialize the search
            </Typography>
          </>}
          {/* clientId input */}
          <TextField
            name="clientID"
            id="client-id-input"
            label="client ID"
            variant="standard"
            size="small"
            value={clientId}
            onChange={handleChangeclientId}
            style={styles.section}
            required
            error={isErrors.clientId}
            helperText={errorsMessages.clientId}
          />
        </>)
      }

      {/** search action */}
      {
        canSearch && <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          style={styles.actionsContainer}
        >
          <Button
            variant="contained"
            size="small"
            style={{ width: 200 }}
            onClick={handleSearch}
            color="info"
          >
            search
          </Button>
        </Grid>
      }
    </Grid >
  );
}
