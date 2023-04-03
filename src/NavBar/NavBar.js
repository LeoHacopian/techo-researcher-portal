import './NavBar.css';
import Logo from '/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Techmetrica.svg';
import {Link} from 'react-router-dom';
import Avatar from '../CustomButton/Avatar';
import AvatarLogo from '/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Avatar.svg'


export default function NavBar() {
    return (
        <div className="NavBar">
            <Link to='/'>
                <img className="TechmetricaLogo" src={Logo} alt="Logo" />
            </Link>
            <Avatar src={AvatarLogo} alt="Avatar">User</Avatar>   
        </div>    
    )
}