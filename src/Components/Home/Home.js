import { Link } from 'react-router-dom'
import { useState} from 'react'
import './Home.css'

export default function Home() {

    const [buttonColor, setButtonColor] = useState('red');
    const [message, setMessage] = useState('');

    function handleButtonClick() {
        setButtonColor(buttonColor === 'blue' ? 'red' : 'blue');
        setMessage(message === '' ? 'Database connected successfully': '');
      }      

    return (
        <div class="button-container">
            <Link to='/Questionnaire'>
                <button class="button">Questionnaires</button>
            </Link>
            <button class="button">Games</button>
            <button class="button">Game Results</button>
            <button class="button">Charts</button>
            <button class="button button2"  style={{ backgroundColor: buttonColor }} onClick={handleButtonClick}>Admin</button>
            <div id='message'>{message}</div>
        </div>
   )
}