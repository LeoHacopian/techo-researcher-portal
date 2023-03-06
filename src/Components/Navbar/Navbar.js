import './Navbar.css'
import Logo from "../Logo/Logo"
import { Button, Avatar, AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { Icon } from '@iconify/react';

function Navbar(){

    const [number, setNumber] = useState(0)
    function increment(){
        setNumber(number + 1)
    }

    return (
        <div className='Navbar'>
            <AppBar className='AppBar' position='static'>
                <Toolbar>
                    <IconButton>
                        <Logo />
                    </IconButton>
                    <Typography className='Techometer' variant="h5">
                        TECHOMETER
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar