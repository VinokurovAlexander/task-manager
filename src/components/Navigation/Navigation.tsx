import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/signup'>Signup</Link>
            </li>
            <li>
                <Link to='/recovery'>Recovery</Link>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;
