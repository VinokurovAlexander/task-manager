import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import LinkUI from '@mui/material/Link';

interface ILink {
    to: string;
}

const Link: React.FC<ILink> = ({ to, children }) => (
    <LinkUI variant='body2' component={ReactRouterLink} to={to}>
        {children}
    </LinkUI>
);

export default Link;
