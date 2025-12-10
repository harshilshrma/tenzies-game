import './Die.css'

export default function Die(props) {
    return (
        <button onClick={() => props.hold(props.id)} className={`die ${props.isHeld ? "is-held" : ""}`}>
            {props.value}
        </button>
    )
}