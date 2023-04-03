import './Home.css';
import CustomButton from "../CustomButton/CustomButton"
import Notebook from "/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Form.svg"
import Games from "/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Games.svg"
import Results from "/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Results.svg"
import Charts from "/Users/leohacopian/Desktop/techo-researcher-portal/src/Assets/Charts.svg";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='ButtonContainer'>
            <Link to="/Form">
                <CustomButton src={Notebook} alt="Notebook">Forms</CustomButton>
            </Link>
            <CustomButton src={Games} alt="Games">Games</CustomButton>
            <CustomButton src={Results} alt="Results">Results</CustomButton>
            <CustomButton src={Charts} alt="Charts">Charts</CustomButton>
        </div>
    )
}