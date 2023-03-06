import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div class="button-container">
            <Link to='/Questionnaire'>
                <button class="button">Questionnaires</button>
            </Link>
            <button class="button">Games</button>
            <button class="button">Game Results</button>
            <button class="button">Charts</button>
        </div>
   )
}