import React, { useState, useEffect, useCallback } from 'react'
import {
    Button,
    Grid,
    Stack,
    Switch,
    Typography,
    InputBase,
    InputAdornment,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { StarBorderPurple500Outlined } from "@mui/icons-material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import actions from '../../../actions';

import useDetaileduser from './service'
import DeleteModal from '../delete'
import ChangeStatusModal from '../changeStatus'

function renderStatusText({ color = 'orange', text = 'Inreview' } = {}) {
    return (
        <Typography variant='body2' style={{ marginLeft: 5 }} color={color}>
            {text}
        </Typography>
    )
}


function RenderSimpleStatus({ status, handleMenuOpen, id }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={(event) => handleMenuOpen(event, id)}>
            {status === "Verified" ? (
                <>
                    <CheckIcon fontSize="small" color="success" />
                    {renderStatusText({ color: 'green', text: 'Verified' })}
                </>
            ) : status === "Inreview" ? (
                <>
                    <HourglassTopIcon fontSize="small" color="warning" />
                    {renderStatusText()}
                </>
            ) : (
                <>
                    <CloseIcon fontSize="small" color="error" />
                    {renderStatusText({ color: 'red', text: 'Unverified' })}
                </>
            )}
        </div>
    );
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

function ActionMenu({ anchorEl, isMenuOpen, handleMenuClose, handleOpen, userId, websiteId }) {
    console.log("website id :", websiteId)
    const dispatch = useDispatch();

    const handleOpenReject = React.useCallback(() => {
        dispatch(actions.changeWebsiteStatus({ userId, websiteId, status: 'Invalid' }));// later add reason
        handleMenuClose();
    }, [dispatch, userId, handleMenuClose]);

    const handleApprove = React.useCallback(() => {
        dispatch(actions.changeWebsiteStatus({ userId, websiteId, status: 'Verified' }));
        handleMenuClose();
    }, [dispatch, userId, handleMenuClose]);

    if (!isMenuOpen) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={"primary-search-account-menu"}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                style: {
                    border: 'none',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.18)',
                },
            }}
        >
            {true ? (
                <MenuItem onClick={handleApprove}>
                    <Button
                        variant='text'
                        startIcon={<CheckCircleIcon />}
                        size='small'
                        color='success'
                    >
                        Approve
                    </Button>
                </MenuItem>
            ) : null}
            {true ? (
                <MenuItem onClick={handleOpenReject}>
                    <Button
                        variant='text'
                        startIcon={<CancelIcon />}
                        size='small'
                        color='error'
                    >
                        Reject
                    </Button>
                </MenuItem>
            ) : null}
        </Menu>
    );
}

const userDetailed = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedWebsiteId(id)
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const {
        user,
        handleModalOpen,
        handleModalClose,
        modal,
        handleActivitiStatusChnage,
        handleGoBack,
        handleOpen
    } = useDetaileduser()


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
                size="small"
                startIcon={<ArrowBackIcon />}
                style={{ marginTop: 15, marginLeft: 15, color: 'gray' }}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
            <Grid container style={{ border: 1, borderColor: 'gray', marginLeft: 50, marginRight: 50, padding: 20 }}>
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
                            {user?.firstName + " " + user?.lastName}
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
                            {user?.email}
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
                            {user?.phone}
                        </Typography>
                    </Grid>
                    {/** Status */}
                    <Grid
                        item
                        container
                        flexDirection='row'
                        alignItems='center'
                        style={{ marginTop: 8 }}
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
                                checked={user?.status[0].value === "active"}
                                color={user?.status[0].value === "active" ? 'success' : 'default'}
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
                            marginTop: 8
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
                            {user?.balance}
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
                            {user?.status[0]?.date}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container xs={12} md={4} style={{ height: '340px' }}>
                    <Grid item container flexDirection="row">
                        <Typography variant="h5" color="text.secondary" fontWeight={800}>
                            user Websites
                        </Typography>
                    </Grid>
                    {user?.websites.map((website, index) => (
                        <Grid key={website.id} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: 14,
                        }}>
                            <InputBase
                                name={`website${index + 1}`}
                                id={`website${index + 1}-input`}
                                defaultValue={website.url}
                                readOnly
                                startAdornment={
                                    <InputAdornment position="start">
                                        <InsertLinkRoundedIcon />
                                    </InputAdornment>
                                }
                                style={{
                                    width: '238px',
                                    textAlign: 'left',
                                    textDecoration: 'none',
                                    borderBottom: 'none',
                                    boxShadow: 'none',
                                    marginRight: 10
                                }}
                                inputProps={{
                                    style: {
                                        textDecoration: 'none',
                                        borderBottom: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                            />

                            <RenderSimpleStatus status={website?.status} handleMenuOpen={handleMenuOpen} id={website.id} />
                            < ActionMenu
                                handleOpen={handleOpen}
                                anchorEl={anchorEl}
                                isMenuOpen={isMenuOpen}
                                handleMenuClose={handleMenuClose}
                                userId={user?.id}
                                websiteId={selectedWebsiteId}
                            />


                        </Grid>
                    ))}
                </Grid>
                <Grid item container xs={12} md={3} style={{ height: '360px', justifyContent: "flex-start" }} >
                    <Grid item container flexDirection="row">
                        <Typography variant="h5" color="text.secondary" fontWeight={800}>
                            user Rating
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
                    <Grid item container style={{ marginTop: 6 }} flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" color="#D50A0A" fontWeight={700} style={{ marginRight: 10 }}>
                            Delete user:
                        </Typography>
                        <Button
                            variant="outlined"
                            style={removeButtonStyle}
                            onClick={() => handleModalOpen({ type: 'delete' })}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <DeleteModal open={modal.openDelete} handleCancel={handleModalClose} id={user?.id} pageName="detailed" />
            <ChangeStatusModal open={modal.openDeacivate} handleCancel={handleModalClose} id={user?.id} />
        </>
    );
}
export default userDetailed;
