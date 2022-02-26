import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const Header = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px',
            alignItems: 'center',
        }}
    >
        <Link
            to='/profile'
            style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            <Typography sx={{ mr: 2 }}>User name</Typography>
            <PersonIcon fontSize='large' />
        </Link>
    </Box>
);

export default Header;
