import React, { useCallback } from 'react';
import { Grid, Button, MenuItem, Menu, Badge, Stack, Typography, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../../actions'



const userCard = ({ user, handleOpen }) => {
    const { id, firstName, lastName, status, balance, websites } = user;
    const fullName = firstName + " " + lastName
    const numberOfWebsites = websites.length
    const accountCreationDate = status[0].date
    const statusValue = status[0].value

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleDeactivate = React.useCallback(() => {
        handleOpen({ type: 'deactivate', id })
    }, [id])

    const handleDelete = React.useCallback(() => {
        handleOpen({ type: 'delete', id })
    }, [id])

    const handleGotoDetails = React.useCallback(() => {
        dispatch(actions.selectedSet({ id }))
        navigate('/adminDashboard/users/detailed')
    }, [navigate])

    const handleActivitiStatusChnage = useCallback(
        e => {
            if (statusValue === "active") handleDeactivate({ type: 'Inactive', id })
            else dispatch(actions.changeStatus({ userId: id, status: 'active' }))
        },
        [statusValue]
    )


    const cardStyle = {
        background: '#f0f0f0',
        padding: '16px',
        borderRadius: '4px',
        border: 'none',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const infoStyle = {
        marginBottom: '8px',
        marginTop: '10px',
        textAlign: 'left',
    };

    const forMFnStyle = {
        marginTop: '8px',
        marginRight: '10px',
        color: '#344767',
        fontWeight: '900',
        fontSize: '17px',
    };

    const forMStyle = {
        color: '#344767',
        fontWeight: '600',
        fontSize: '14px',
    };

    const forStyle = {
        color: '#67748E',
        fontWeight: '500',
        fontSize: '14px',
    };

    const actionsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const buttonStyle = {
        borderRadius: '4px',
        padding: '1px',
        cursor: 'pointer',
        outline: 'none',
        height: '42px',
        fontSize: '13px',
        background: '#ffffff',
        color: '#474757',
        borderColor: '#474757',
        display: 'flex',
        alignItems: 'center',
    };

    const buttonTextStyle = {
        marginLeft: '8px',
    };

    const removeButtonStyle = {
        ...buttonStyle,
        background: '#f0f0f0',
        color: '#D50A0A',
        borderColor: '#f0f0f0',
    };

    const changeStatusButtonStyle = {
        ...buttonStyle,
        background: '#f0f0f0',
        color: '#344767',
        borderColor: '#f0f0f0',
    };

    const detailsButtonStyle = {
        ...buttonStyle,
        background: '#f0f0f0',
        color: 'rgb(215 158 29)',
        borderColor: '#f0f0f0',
    };

    return (
        <Grid container style={cardStyle}>
            <Grid container alignItems='center' justifyContent='center'>
                {/* Buttons */}
                <Grid item xs={12} sm={12} md={12} style={{ ...actionsStyle, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        style={removeButtonStyle}
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize={'small'} />
                        <span style={buttonTextStyle}>Remove</span>
                    </Button>

                    <Button
                        variant="outlined"
                        style={detailsButtonStyle}
                        onClick={() => handleGotoDetails()}
                    >
                        <InfoIcon fontSize={'small'} />
                        <span style={buttonTextStyle}>Details</span>
                    </Button>
                </Grid>
            </Grid>
            {/* Full Name */}
            <Grid item style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                <span style={forMFnStyle}>{fullName}</span>
            </Grid>

            {/* Render the card content */}
            <Grid item xs={12} style={infoStyle}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <span style={forStyle}>Status:</span>
                    &nbsp;&nbsp;&nbsp;
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography style={forMStyle} variant='caption' color='GrayText'>
                            Inactive
                        </Typography>
                        <Switch
                            checked={statusValue === "active"}
                            color={statusValue === "active" ? 'success' : 'default'}
                            onChange={handleActivitiStatusChnage}
                        />
                        <Typography style={forMStyle} variant='caption' color='GrayText'>
                            Active
                        </Typography>
                    </Stack>
                </div>
                <div>
                    <span style={forStyle}>Account Creation Date:</span>&nbsp;&nbsp;&nbsp;<span style={forMStyle}>{accountCreationDate}</span>
                </div>
                <div>
                    <span style={forStyle}>Number of Websites:</span>&nbsp;&nbsp;&nbsp;<span style={forMStyle}>{numberOfWebsites}</span>
                </div>
                <div>
                    <span style={forStyle}>Balance:</span>&nbsp;&nbsp;&nbsp;<span style={forMStyle}>{balance}</span>
                </div>
            </Grid>
        </Grid >
    );
};

export default userCard;