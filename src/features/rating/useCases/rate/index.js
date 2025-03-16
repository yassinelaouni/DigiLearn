import { Search } from "@mui/icons-material";
import {
  Grid,
  Switch,
  TextField,
  Button,
  Typography,
  Rating,
  Autocomplete,
  Box,
  Tabs,
  Tab
} from "@mui/material";

import styles from "./styles";
import useRate from "./service";
import cities from "../../../../cities.json";

export default function Rate({ handleSwitch = () => { }, value }) {
  const {
    data,
    clientId,
    handleChange,
    handleChangeCity,
    handleChangeclientId,
    handleRate,
    selectedOption,
    showOrderInfo,
    handleOptionChange,
    canRate,
    isErrors,
    errorsMessages
  } = useRate();

  const selectProps = {
    options: cities,
    getOptionLabel: (option) => option,
  }


  return (
    <Grid container style={{ marginTop: 35 }}>
      {/** switch view action */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleSwitch} centered>
          <Tab sx={{
            fontSize: '16px',
            textTransform: 'none',
          }}
            label="Rate a client"
            value="1" />
          <Tab sx={{
            fontSize: '16px',
            textTransform: 'none',
          }} label="Get client's Rating"
            value="2" />
        </Tabs>
      </Box>


      {/** client info */}
      <Grid
        item
        container
        xs={12}
        md={6}
        style={{ marginTop: 34 }}
        flexDirection="column"
        justifyContent="flex-start"
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
            {!canRate && <>
              < Typography variant="body1" style={{ marginTop: 28, fontSize: "15px", color: "gray" }}>
                Enter client's data to initialize the rating
              </Typography>
            </>}
            {/* first name input */}
            <TextField
              name="firstName"
              id="first-name-input"
              label="First name"
              variant="standard"
              size="small"
              value={data.firstName}
              onChange={handleChange}
              style={styles.section}
              required
              error={isErrors.firstName}
              helperText={errorsMessages.firstName}
            />
            {/* last name input */}
            <TextField
              name="lastName"
              id="last-name-input"
              label="Last name"
              variant="standard"
              size="small"
              value={data.lastName}
              onChange={handleChange}
              style={styles.section}
              required
              error={isErrors.lastName}
              helperText={errorsMessages.lastName}
            />
            {/* phone input */}
            <TextField
              name="phone"
              id="phone-input"
              label="Phone"
              variant="standard"
              size="small"
              value={data.phone}
              onChange={handleChange}
              style={styles.section}
              required
              error={isErrors.phone}
              helperText={errorsMessages.phone}
              placeholder="+212 --- --- ---"
            />
            {/* city input */}
            <Autocomplete
              {...selectProps}
              id="city"
              name="city"
              disableClearable
              style={styles.section}
              inputValue={data.city}
              onInputChange={(_, newValue) => handleChangeCity(newValue)}
              value={data.city}
              onChange={(_, newValue) => handleChangeCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="standard"
                  size="small"
                  required
                  sx={{ width: "100%" }}
                />
              )}
            />
            {/* email input */}
            <TextField
              name="email"
              id="email-input"
              label="Email"
              variant="standard"
              size="small"
              value={data.email}
              onChange={handleChange}
              style={styles.section}
              error={isErrors.email}
              helperText={errorsMessages.email}
            />
          </>
        )
          :
          (<>
            {!canRate && <>
              < Typography variant="body1" style={{ marginTop: 28, fontSize: "15px", color: "gray" }}>
                Enter client's ID to initialize the rating
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
          </>)}


      </Grid>

      {/** rating info */}
      {
        showOrderInfo && <Grid
          item
          container
          xs={12}
          md={6}
          style={{ marginTop: 23 }}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/** order value input */}
          <TextField
            name="orderValue"
            id="order-value-input"
            label="Order value"
            variant="standard"
            size="small"
            value={data.orderValue}
            onChange={handleChange}
            style={styles.section}
            type="number"
          />
          {/** communication input */}
          <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
            <Typography variant="caption" color="GrayText" fontWeight="bold">How was the comminication ?</Typography>
            <Grid xs={6} item container alignItems="center">
              <Rating
                name="communication"
                value={data.communication}
                onChange={handleChange}
                style={{ marginLeft: 15 }}
              />
            </Grid>
          </Grid>
          {/** punctuality input */}
          <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
            <Typography variant="caption" color="GrayText" fontWeight="bold">How punctual the client is ?</Typography>
            <Grid xs={6} item container alignItems="center">
              <Rating
                name="punctuality"
                value={data.punctuality}
                onChange={handleChange}
                style={{ marginLeft: 15 }}
              />
            </Grid>
          </Grid>

          {/** order cancellation input */}
          <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
            <Typography variant="caption" color="GrayText" fontWeight="bold">Is the order cancelled ?</Typography>
            <Grid xs={6} item container alignItems="center">
              <Switch
                name="orderCancellation"
                checked={data.orderCancellation}
                color="warning"
                size="small"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'orderCancellation' }}
              />
            </Grid>
          </Grid>

          {/** items package return  input */}
          <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
            <Typography variant="caption" color="GrayText" fontWeight="bold">Is the package returned ?</Typography>
            <Grid xs={6} item container alignItems="center">
              <Switch
                name="packageReturn"
                checked={data.packageReturn}
                color="warning"
                size="small"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'packageReturn' }}
              />
            </Grid>
          </Grid>

          {/** rate action */}
          {canRate && <Grid
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
              onClick={handleRate}
              color="info"
            >
              Rate
            </Button>
          </Grid>}
        </Grid>
      }
    </Grid >
  );
}
