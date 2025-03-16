import React from 'react';
import { Box, Link, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { AssessmentOutlined as AssessmentOutlinedIcon, AccountBoxOutlined as AccountBoxOutlinedIcon, ShoppingBasket as ShoppingBasketIcon } from '@mui/icons-material';
import components from '../../components'

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const navConfig = [
    {
        title: 'dashboard',
        path: '/adminDashboard/app',
        icon: <AssessmentOutlinedIcon />,
    },
    {
        title: 'merchant',
        path: '/adminDashboard/merchants',
        icon: <ShoppingBasketIcon />,
    },
    {
        title: 'client',
        path: '/adminDashboard/buyers',
        icon: <AccountBoxOutlinedIcon />,
    },
];

const Sidebar = () => {
    return (
        <components.Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
            }}
        >
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                {/* <Logo /> */}
            </Box>

            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none">
                    <StyledAccount>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {/* {account.displayName} */}
                                Hamza LACHQAR
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {/* {account.role} */}
                                Admin
                            </Typography>
                        </Box>
                    </StyledAccount>
                </Link>
            </Box>

            <components.NavSection data={navConfig} />
        </components.Scrollbar>
    );
};

export default Sidebar;