import * as React from "react";
import { AppBar, Toolbar, IconButton, Menu, Grid, MenuItem, Typography, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import authSelectors from "../../features/auth/selectors"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import components from '../../components'
import StarIcon from '@mui/icons-material/Star';
import CableIcon from '@mui/icons-material/Cable';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { AiTwotoneApi, AiTwotoneStar } from 'react-icons/ai';





const menuId = "primary-search-account-menu";

export default function DenseAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const { balance } = useSelector(authSelectors.user)


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: 'Profile',
      url: '/dashboard/profile',
    },
    {
      label: 'Logout',
      url: '/',
    },

  ];

   
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid xs={6} item container alignItems="center" justifyContent="flex-start"> {/* Adjusted justifyContent */}
              <Typography variant="caption" color="gray" fontWeight="bold" style={{ fontSize: "14px" }}>
                Balance
              </Typography>
              <Typography variant="button" fontWeight="bold" style={{ marginLeft: 15, fontSize: "14px", color: balance <= 0 ? "red" : "green" }}>
                {balance}
              </Typography>
              <Typography variant="caption" fontWeight="bold" style={{ marginLeft: 15, fontSize: "14px", color: balance <= 0 ? "red" : "green" }}>
                Points
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 34,
                  fontSize: "11px",
                  backgroundColor: "green",
                  color: "#fff",
                  cursor: "pointer",
                  padding: "6px 6px",
                  borderRadius: "4px"
                }}
                onClick={() => { navigate('/dashboard/deposit') }}
              >
                <FaMoneyCheckAlt size={20} style={{ marginRight: "6px" }} />
                Deposit
              </Button>

            </Grid>
            <Grid xs={6} item container alignItems="center" justifyContent="flex-end">
              <Grid xs={2} >
                <NavLink
                  to="/dashboard"
                  style={{ textDecoration: "none", fontSize: "14px" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      startIcon={<AiTwotoneStar size={20} />}
                      size="small"
                      style={{ color: isActive ? "#1976D2" : "gray" }}
                    >
                      Rating
                    </Button>
                  )}
                </NavLink>
              </Grid>
              <Grid xs={3} >
                <NavLink
                  to="/dashboard/openAPIGuide"
                  style={{ textDecoration: "none", fontSize: "14px" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      startIcon={<AiTwotoneApi size={20} />}
                      size="small"
                      style={{ color: isActive ? "#1976D2" : "gray" }}
                    >
                      API Integration
                    </Button>
                  )}
                </NavLink>
              </Grid>
              <components.AppBarMenu menuItems={menuItems} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar >

    </>
  );
}
