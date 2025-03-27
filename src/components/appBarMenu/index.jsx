import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, Divider } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../../features/auth/actions'; // Assuming the logout action is defined in a separate file

const AppBarMenu = ({ menuItems }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item) => {
        handleMenuClose();
        navigate(item.url);
        if (item.label === 'Logout') {
            dispatch(actions.logout());
            navigate("/")
        }
    };

    return (
        <>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <Stack sx={{ p: 1 }}>
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};

export default AppBarMenu;