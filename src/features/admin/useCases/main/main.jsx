import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

export const Dashboard = () => {
    // Mock data for the line chart
    const lineChartData = [
        { month: 'Jan', visits: 500, buyers: 120, users: 80 },
        { month: 'Feb', visits: 600, buyers: 130, users: 90 },
        { month: 'Mar', visits: 700, buyers: 140, users: 100 },
        { month: 'Apr', visits: 800, buyers: 150, users: 110 },
        { month: 'May', visits: 900, buyers: 160, users: 120 },
        { month: 'Jun', visits: 1000, buyers: 170, users: 130 },
    ];

    // Mock data for the pie chart
    const pieData = [
        { name: 'buyers', value: 120 },
        { name: 'users', value: 80 },
    ];

    // Calculate the percentage increase compared to last year
    const currentYearVisits = lineChartData.reduce((total, data) => total + data.visits, 0);
    const lastYearVisits = currentYearVisits / 1.43; // Assuming a 43% increase
    const percentageIncrease = ((currentYearVisits - lastYearVisits) / lastYearVisits) * 100;

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Hi, Welcome back!
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Website Visits
                            </Typography>
                            <Typography variant="h4">{currentYearVisits}</Typography>
                            <Typography variant="subtitle1">
                                {percentageIncrease > 0 ? `+${percentageIncrease.toFixed(2)}%` : 'No change'}
                                &nbsp;than last year
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="rgba(75, 192, 192, 1)"
                                        fill="rgba(75, 192, 192, 0.2)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="buyers"
                                        stroke="rgba(82, 202, 139, 1)"
                                        fill="rgba(82, 202, 139, 0.2)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="rgba(88, 132, 216, 1)"
                                        fill="rgba(88, 132, 216, 0.2)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                buyers and users
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                    >
                                        <Cell key="buyers" fill="#82ca9d" />
                                        <Cell key="users" fill="#8884d8" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};