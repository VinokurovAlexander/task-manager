import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const itemStyle = {
    color: 'white',
    '&:hover': { opacity: [0.5] },
};

const Menu = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'primary.main',
            padding: '20px',
            gap: 3,
        }}
    >
        <Link to='/'>
            <HomeIcon sx={itemStyle} fontSize='large' />
        </Link>
        <Link to='/profile'>
            <PersonIcon fontSize='large' sx={itemStyle} />
        </Link>
        <LogoutIcon
            fontSize='large'
            sx={{
                ...itemStyle,
                mt: 'auto',
            }}
        />
    </Box>
);

export default Menu;
