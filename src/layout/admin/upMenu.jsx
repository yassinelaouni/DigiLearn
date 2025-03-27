import * as React from "react";
import { AppBar, Toolbar, IconButton, Menu, Grid, MenuItem, Typography, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import authSelectors from "../../features/auth/selectors"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import components from '../../components'
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import StarIcon from '@mui/icons-material/Star';
import CableIcon from '@mui/icons-material/Cable';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';



const menuId = "primary-search-account-menu";

export default function DenseAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const { balance } = useSelector(authSelectors.user)


  const menuItems = [
    {
      label: 'Profile',
      url: '/adminDashboard/profile',
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
            <Grid xs={10} item container alignItems="center" justifyContent="flex-start" style={{ marginLeft: 20 }}>
              <Grid xs={2} >
                <NavLink
                  to="/adminDashboard/merchants"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      startIcon={<StoreIcon />}
                      size="small"
                      style={{ color: isActive ? "#1976D2" : "gray" }}
                    >
                      Merchants
                    </Button>
                  )}
                </NavLink>
              </Grid>
              <Grid xs={2}>
                <NavLink
                  to="/adminDashboard/buyers"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      startIcon={<AssignmentIndIcon />}
                      size="small"
                      style={{ color: isActive ? "#1976D2" : "gray" }}
                    >
                      buyers
                    </Button>
                  )}
                </NavLink>
              </Grid>
              <Grid xs={2}>
                <NavLink
                  to="/adminDashboard/payments"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant="text"
                      startIcon={<PaymentsIcon />}
                      size="small"
                      style={{ color: isActive ? "#1976D2" : "gray" }}
                    >
                      Payments
                    </Button>
                  )}
                </NavLink>
              </Grid>




            </Grid>
            <Grid xs={1} item container alignItems="center" justifyContent="flex-end"> {/* Adjusted justifyContent */}
              <components.AppBarMenu menuItems={menuItems} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar >
      <Grid style={{ margin: 10, marginTop: 25 }}>
        <Outlet />
      </Grid >
    </>
  );
}
