import React from 'react';
import { Grid } from '@mui/material';
import PricingCard from './pricingCard';

const options1 = [
    {
        credits: 40,
        price: 9,
        description: '$0.23 / point',
    },
    {
        credits: 200,
        price: 39,
        description: '$0.20 / point',
    },
    {
        credits: 500,
        price: 89,
        description: '$0.18 / point',
    },
    {
        credits: 1200,
        price: 189,
        description: '$0.16 / point',
    },
    {
        credits: 2800,
        price: 389,
        description: '$0.14 / point',
    },
];

const options2 = [
    {
        credits: 1,
        price: 1.99,
        description: '$0.23 / point',
    },
    {
        credits: 10,
        price: 9,
        description: '$0.20 / point',
    },
    {
        credits: 75,
        price: 49,
        description: '$0.18 / point',
    },
    {
        credits: 200,
        price: 189,
        description: '$0.16 / point',
    },
    {
        credits: 500,
        price: 199,
        description: '$0.14 / point',
    },
];



const PricingPage = () => {
    return (
        <div style={{ margin: '10px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.4rem', fontFamily: 'Roboto', fontSize: '34px', fontWeight: 'bold' }}>Boosting Your Point-Buying Potential</h1>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Roboto', fontSize: '18px' }}>1 POINT = 1 CREDIT or less</h3>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <PricingCard title="Subscription Plan" options={options1} month={true} />
                </Grid>
                <Grid item>
                    <PricingCard title="Pay as you go" options={options2} />
                </Grid>
            </Grid>
        </div >
    );
};

export default PricingPage;