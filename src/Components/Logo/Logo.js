import './Logo.css'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'


export default function Logo() {
    return (
        <div className='Logo'>
            <Link to='/'>
                <Icon className='Icon' icon="ic:round-keyboard-arrow-left" />
                <Icon className='Icon' icon="la:brain" />
                <Icon className='Icon' icon="ic:round-keyboard-arrow-right" />
            </Link>
        </div>
    )
}