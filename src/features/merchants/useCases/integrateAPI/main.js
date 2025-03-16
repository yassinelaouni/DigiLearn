import React, { useEffect, useState } from 'react';
import { Typography, Box, TableContainer, Paper, Table, Grid, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export function OpenAPIGuide() {
    const [fundingRateHistory, setFundingRateHistory] = useState([]);
    const [clientRating, setclientRating] = useState(null);
    const [authenticateResponse, setAuthenticateResponse] = useState(null);

    useEffect(() => {
        const fetchFundingRateHistory = async () => {
            try {
                // Simulate API response with mock data
                const mockData = [
                    {
                        symbol: "BTCUSDT",
                        fundingRate: "-0.03750000",
                        fundingTime: 1570608000000,
                    },
                    {
                        symbol: "BTCUSDT",
                        fundingRate: "0.00010000",
                        fundingTime: 1570636800000,
                    }
                ];

                setFundingRateHistory(mockData);
            } catch (error) {
                console.error('Error fetching funding rate history:', error);
            }
        };

        const fetchclientRating = async () => {
            try {
                // Simulate API response with mock data
                const mockData = {
                    rating: 4.5,
                    response: "The client is highly recommended.",
                };

                setclientRating(mockData);
            } catch (error) {
                console.error('Error fetching client rating:', error);
            }
        };

        const fetchAuthenticateResponse = async () => {
            try {
                // Simulate API response with mock data
                const mockData = {
                    response: "Authentication successful.",
                };

                setAuthenticateResponse(mockData);
            } catch (error) {
                console.error('Error fetching authentication response:', error);
            }
        };

        fetchFundingRateHistory();
        fetchclientRating();
        fetchAuthenticateResponse();
    }, []);


    return (
        < Grid >
            {/* Endpoint: Authenticate using the apiKey */}
            < Box sx={{ padding: '20px', marginTop: '14px' }}>
                <Typography variant="h6" color="#696969">Authenticate using the apiKey</Typography>

                <Grid container spacing={2} sx={{ marginTop: '8px' }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ flex: 5, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                            <Typography variant="body1">
                                <span style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "3px" }}>GET /fapi/v1/time</span>
                            </Typography>

                            <Typography variant="body1">
                                Test connectivity to the Rest API and get the current server time.
                            </Typography>

                            <Typography variant="body1">Weight: 1</Typography>

                            <Typography variant="body1">Parameters: NONE</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ flex: 5, backgroundColor: '#1E2224', padding: '20px', borderRadius: '5px' }}>
                            <Typography sx={{ color: 'white' }} variant="h6">Response:</Typography>
                            <Box>
                                <pre style={{ textAlign: 'left', overflowX: 'auto', color: '#e6db74' }}>{JSON.stringify(authenticateResponse, null, 2)}</pre>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box >

            {/* Endpoint: Rate a client */}
            < Box sx={{ backgroundColor: '#fff', padding: '20px' }}>
                <Typography variant="h6" color="#696969">Rate a client</Typography>

                <Grid container spacing={2} sx={{ marginTop: '8px' }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ flex: 5, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                            <Typography variant="body1">
                                <span style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "3px" }}>GET /fapi/v1/time</span>
                            </Typography>

                            <Typography variant="body1">
                                Test connectivity to the Rest API and get the current server time.
                            </Typography>

                            <Typography variant="body1">Weight: 1</Typography>

                            <Typography variant="body1">Parameters: NONE</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ flex: 5, backgroundColor: '#1E2224', padding: '20px', borderRadius: '5px' }}>
                            <Typography sx={{ color: 'white' }} variant="h6">Response:</Typography>
                            <Box>
                                <pre style={{ textAlign: 'left', overflowX: 'auto', color: '#e6db74' }}>{JSON.stringify(clientRating, null, 2)}</pre>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ backgroundColor: '#fff', padding: '20px' }}>
                <Typography variant="h6" color="#696969">Funding Rate History</Typography>

                <Grid container spacing={2} sx={{ marginTop: '8px' }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ flex: 5, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                            <Typography variant="body1">
                                <span style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", padding: "3px" }}>GET /fapi/v1/time</span>
                            </Typography>

                            <Typography variant="body1">
                                Get funding rate history.
                            </Typography>

                            <Typography variant="body1">Weight: 1</Typography>

                            <Typography variant="h6">Parameters:</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Mandatory</TableCell>
                                            <TableCell>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>symbol</TableCell>
                                            <TableCell>STRING</TableCell>
                                            <TableCell>YES</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>period</TableCell>
                                            <TableCell>ENUM</TableCell>
                                            <TableCell>YES</TableCell>
                                            <TableCell>"5m","15m","30m","1h","2h","4h","6h","12h","1d"</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>limit</TableCell>
                                            <TableCell>LONG</TableCell>
                                            <TableCell>NO</TableCell>
                                            <TableCell>default 30, max 500</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>startTime</TableCell>
                                            <TableCell>LONG</TableCell>
                                            <TableCell>NO</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>endTime</TableCell>
                                            <TableCell>LONG</TableCell>
                                            <TableCell>NO</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box sx={{ flex: 5, backgroundColor: '#1E2224', padding: '20px', borderRadius: '5px' }}>
                            <Typography sx={{ color: 'white' }} variant="h6">Response:</Typography>
                            <pre style={{ textAlign: 'left', overflowX: 'auto', color: '#e6db74' }}>{JSON.stringify(fundingRateHistory, null, 2)}</pre>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid >
    )
}
