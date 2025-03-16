import React, { useState, useEffect, useCallback } from 'react'
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Grid,
    IconButton,
    Stack,
    Switch,
    Typography,
    InputBase,
    Box,
    InputAdornment,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { StarBorderPurple500Outlined } from "@mui/icons-material"
import PublicIcon from '@mui/icons-material/Public'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import TimerOffIcon from '@mui/icons-material/TimerOff'
import { Edit as EditIcon } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Fingerprint from '@mui/icons-material/Fingerprint';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';


import useDetailedclient from './service'
import Delete from '../delete'
import ChangeStatus from '../changeStatus'

function renderStatusText({ color = 'orange', text = 'Inreview' } = {}) {
    return (
        <Typography variant='body2' style={{ marginLeft: 5 }} color={color}>
            {text}
        </Typography>
    )
}


function RenderSimpleStatus({ status }) {

    return (
        <>
            {status === "Verified" ? (
                <>
                    <CheckIcon fontSize='small' color='success' />
                    {renderStatusText({ color: 'green', text: 'Verified' })}
                </>
            ) : status === "Inreview" ? (
                <>
                    <HourglassTopIcon fontSize='small' color='warning' />
                    {renderStatusText()}
                </>
            ) : (
                <>
                    <CloseIcon fontSize='small' color='error' />
                    {renderStatusText({ color: 'red', text: 'Unverified' })}
                </>
            )}
        </>
    )
}



function RenderReason({ reason }) {
    return (
        <Grid item container style={{ marginTop: 25 }} flexDirection={'column'}>
            {reason && (
                <>
                    <Typography variant='body2' color='text.secondary'>
                        Reason:
                    </Typography>
                    <Typography variant='body2' color='red'>
                        {reason}
                    </Typography>
                </>
            )}
        </Grid>
    )
}

const BuyerDetailed = () => {
    const dispatch = useDispatch()


    const {
        merchant,
        handleModalOpen,
        handleModalClose,
        modal,
        handleActivitiStatusChnage,
        handleGoBack
    } = useDetailedclient()



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
        padding: '8px',
        cursor: 'pointer',
        outline: 'none',
        height: '42px',
        fontSize: '13px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
    };

    const buttonTextStyle = {
        marginLeft: '8px',
    };

    const removeButtonStyle = {
        ...buttonStyle,
        background: '#ffffff',
        color: '#D50A0A',
        borderColor: '#ffffff',
    };

    const styles = {
        section: { marginTop: 15, width: "60%" },
        actionsContainer: { marginTop: 60 }
    }

    const changeStatusButtonStyle = {
        ...buttonStyle,
        background: '#ffffff',
        color: '#344767',
        borderColor: '#ffffff',
    };

    const detailsButtonStyle = {
        ...buttonStyle,
        background: '#f0f0f0',
        color: 'rgb(215 158 29)',
        borderColor: '#f0f0f0',
    };


    return (
        <>
            <Button
                size='small'
                startIcon={<ArrowBackIcon />}
                style={{ marginTop: 15, marginLeft: 15, color: 'gray' }}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
            <Grid
                container
                style={{
                    border: 1,
                    borderColor: 'gray',
                    marginLeft: 50,
                    marginRight: 50,
                    padding: 20,
                }}
            >
                {/** left section */}
                <Grid item container xs={12} md={4} style={{ height: '340px' }}>
                    <Grid item container flexDirection='row'>
                        <Typography
                            variant='h5'
                            color='text.secondary'
                            fontWeight={800}
                            style={{}}
                        >
                            User Informations
                        </Typography>
                    </Grid>
                    {/** full name */}
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Seller ID :
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            yeloauni
                        </Typography>
                    </Grid>
                    {/** fullname */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{ marginTop: 10 }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Full Name:
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            {merchant?.firstName + " " + merchant?.lastName}
                        </Typography>
                    </Grid>
                    {/** username */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{ marginTop: 10 }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Email:
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            {merchant?.email}
                        </Typography>
                    </Grid>
                    {/** gender */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{ marginTop: 10 }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Phone:
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            {merchant?.phone}
                        </Typography>
                    </Grid>
                    {/** Status */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{ marginTop: 2 }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Status:
                        </Typography>
                        &nbsp;&nbsp;&nbsp;
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography variant='body2' color='text.secondary'>
                                Inactive
                            </Typography>
                            <Switch
                                checked={merchant?.status[0].value === "active"}
                                color={merchant?.status[0].value === "active" ? 'success' : 'default'}
                                onChange={handleActivitiStatusChnage}
                            />
                            <Typography variant='body2' color='text.secondary'>
                                Active
                            </Typography>
                        </Stack>
                    </Grid>
                    {/** language */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{
                            marginTop: 2
                        }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Balance:
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            {merchant?.balance}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{
                            marginTop: 10
                        }}
                    >
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>
                            Account Creation Date:
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            style={{ marginLeft: 20 }}
                        >
                            {merchant?.status[0]?.date}
                        </Typography>
                    </Grid>
                </Grid>
                {/** middle section */}
                <Grid item container xs={12} md={3} style={{ marginRight: 30, height: '300px', justifyContent: "flex-start" }} >
                    <Grid item container flexDirection="row">
                        <Typography variant="h5" color="text.secondary" fontWeight={800}>
                            Merchant Rating
                        </Typography>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Total reviews:</Typography>
                        <Grid xs={6} item container alignItems="center">
                            <Typography variant='body2'
                                color='text.secondary'
                                style={{ marginLeft: 20 }}>1505</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Accumulated orders value:</Typography>
                        <Grid xs={3.5} item container alignItems="center">
                            <Typography variant='body2'
                                color='text.secondary'
                                style={{ marginLeft: 20 }}>10 000 DH</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Communication:</Typography>
                        <Grid xs={6} item container alignItems="center" style={{ marginLeft: 20 }}>
                            <StarBorderPurple500Outlined color="primary" />
                            <Typography variant='body2'
                                color='text.secondary'
                            >4.7</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Punctuality:</Typography>
                        <Grid xs={6} item container alignItems="center" style={{ marginLeft: 20 }}>
                            <StarBorderPurple500Outlined color="primary" />
                            <Typography variant='body2'
                                color='text.secondary'
                            >5</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Order cancellation:</Typography>
                        <Grid xs={6} item container alignItems="center">
                            <Typography variant='body2'
                                color='text.secondary'
                                style={{ marginLeft: 20 }}>3 %</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container flexDirection='row' alignItems='center' style={{ marginTop: 10 }}>
                        <Typography variant='body2' color='text.secondary' fontWeight={700}>Return:</Typography>
                        <Grid xs={6} item container alignItems="center">
                            <Typography variant='body2'
                                color='text.secondary'
                                style={{ marginLeft: 20 }}>20 %</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/** right section */}
                <Grid item container xs={12} md={3} style={{ marginTop: 20, marginRight: 4, height: '80px' }} >
                    {/** delete user */}
                    <Grid item container flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography
                            variant='body2'
                            color='#D50A0A'
                            fontWeight={700}
                            style={{ marginRight: 10 }}
                        >
                            Delete merchant:
                        </Typography>
                        <Button
                            variant="outlined"
                            style={removeButtonStyle}
                            onClick={() => handleModalOpen({ type: 'delete' })}
                        >
                            <DeleteIcon fontSize={'small'} />
                        </Button>
                    </Grid>

                </Grid>
            </Grid >
            <Delete open={modal.openDelete} handleCancel={handleModalClose} id={merchant?.id} pageName={"detailed"} />
            < ChangeStatus
                open={modal.openDeacivate}
                handleCancel={handleModalClose}
                id={merchant?.id}
            />
        </>
    )
}
export default BuyerDetailed;