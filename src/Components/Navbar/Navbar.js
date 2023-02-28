import './Navbar.css'
import { Button, Avatar } from '@mui/material'
import { useState } from 'react'

function Navbar(){
    const [number, setNumber] = useState(0)
    function increment(){
        setNumber(number + 1)
    }
    return (
        <div className='Navbar'>
            <Button variant='contained' onClick={increment}>Hello</Button>
            <div>{number}</div>
            {/* <Avatar>LH</Avatar> */}
        </div>
    )
}

export default Navbar