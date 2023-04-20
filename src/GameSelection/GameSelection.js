import './GameSelection.css'

export default function GameSelection(props) {

    const { children, ...rest } = props;

    return (
        <div className='GameSelection-CompleteContainer'>
            <button className='GameSelection-Button'>PLAY GAMES</button>
        </div>
    )
}