import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from "react-router-dom";

export const NavigationButtons = ({activeButton, onButtonActivation}) => {
    const navigate = useNavigate();
    const fullWidthButton = { pl: 2, gap: 3, width: '100%', justifyContent: 'flex-start' };
    const buttons = [
        { id: 'home', label: 'Home', icon: <HomeIcon /> },
        { id: 'details', label: 'Details', icon: <DashboardIcon /> },
        { id: 'movements', label: 'Movements', icon: <ReorderIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    const isButtonActive = (buttonId) => {
        if (activeButton === buttonId) {
            return true;
        }
        return false;
    }

    const handleLogout = () => {
        if (window.sessionStorage) {
            sessionStorage.removeItem('sessionJWTToken');
            sessionStorage.removeItem('sessionId');
        } else {
            throw new Error('Error deleting session storage');
        }
        navigate('/login');
    }

    return (
        <Grid container sx={{ maxWidth: 300, p: 1, gap: 0 }} direction="column" alignItems="flex-start">
            { buttons.map((button) => (
                <Button 
                    sx={fullWidthButton}
                    key={button.id} 
                    onClick={() => onButtonActivation(button.id)}
                    style={{ backgroundColor: isButtonActive(button.id) ? '#2196f3' : '', color: isButtonActive(button.id) ? 'white' : ''}}
                >
                    {button.icon}
                    <h3>{button.label}</h3>
                </Button>
            ))}
            <Button 
                key='logout'
                sx={fullWidthButton}
                color='error'
                onClick={handleLogout}
            >
                <LogoutIcon />
                <h3>Log Out</h3>
            </Button>
        </Grid>
    )
}