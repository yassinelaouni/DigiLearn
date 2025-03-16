import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const PricingCard = ({ title, options, month }) => {
    const [selectedOption, setSelectedOption] = useState(options[1]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    const maxWidth = screenWidth <= 500 ? '370px' : '420px';
    const pd = screenWidth <= 500 ? '0.7rem' : '2rem';

    const buttonStyles = {
        width: "200px",
        padding: "12px 24px",
        marginTop: '1.5rem',
        borderRadius: "25px",
        fontSize: "16px",
        backgroundColor: month ? "#0F70E6" : "transparent",
        color: month ? "#fff" : "#0F70E6",
        border: month ? "none" : "2px solid #0F70E6",
        cursor: "pointer",
    };




    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                padding: pd,
                textAlign: 'center',
                width: maxWidth,
                height: 'auto',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            {month === true && (
                <div
                    style={{
                        content: 'attr(data-ribbon)',
                        maxWidth: '220px',
                        position: 'absolute',
                        fontSize: '16px',
                        fontWeight: '700',
                        top: '0',
                        right: '0',
                        transform: 'translate(29.29%,-100%) rotate(45deg)',
                        color: '#fff',
                        textAlign: 'center',
                        border: '1px solid transparent',
                        borderBottom: '0',
                        transformOrigin: 'bottom left',
                        padding: '5px 35px 17px',
                        background: 'linear-gradient(rgba(0,0,0,.5) 0 0) bottom/100% 12px no-repeat #ff7272',
                        backgroundClip: 'padding-box',
                        clipPath: 'polygon(0 0,100% 0,100% 100%,calc(100% - 12px) calc(100% - 12px),12px calc(100% - 12px),0 100%)',
                        WebkitMask: 'linear-gradient(-135deg,transparent calc(50% - 8.484px),#fff 0) bottom right,linear-gradient(135deg,transparent calc(50% - 8.484px),#fff 0) bottom left',
                        WebkitMaskSize: '100vmax 100vmax',
                        WebkitMaskComposite: 'destination-in,xor',
                        zIndex: '1',
                    }}
                >
                    Best Value
                </div>
            )}
            <Typography variant="h4" sx={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Typography variant="h4" sx={{ fontWeight: '800', color: '#0F70E6' }}>
                    $ {selectedOption
                        ? (selectedOption.price / selectedOption.credits).toFixed(2)
                        : options.length > 0
                            ? (options[1].price / options[1].credits).toFixed(2)
                            : ''}
                </Typography>
                {selectedOption?.price && (
                    <Typography variant="body1" sx={{ color: '#0F70E6', marginLeft: '0.5rem' }}>
                        / point
                    </Typography>
                )}
            </div>
            {options.map((option, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '1rem',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={selectedOption === option}
                            onChange={() => handleOptionChange(option)}
                            style={{
                                appearance: 'none',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: '1px solid #888',
                                marginRight: '8px',
                                cursor: 'pointer',
                                backgroundColor: selectedOption === option ? '#0F70E6' : 'transparent',
                            }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 'normal' }}>
                            {option.credits} credits
                        </Typography>
                        {month === true && (
                            <Typography variant="body1" sx={{ color: '#888', marginLeft: '3px' }}>
                                / month
                            </Typography>
                        )}
                    </div>
                    <div>
                        <Typography variant="body2">$ {option.price}</Typography>
                    </div>
                    <div>
                        <Typography variant="body1" sx={{ color: '#888' }}>
                            {option.description}
                        </Typography>
                    </div>
                </div>
            ))}
            <button style={buttonStyles}>
                {month ? "Subscribe now" : "Buy now"}
            </button>
        </Box >
    );
};

export default PricingCard;