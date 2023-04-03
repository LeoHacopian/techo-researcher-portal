import './Avatar.css'

export default function Avatar(props) {
    const { children, ...rest } = props;
    return (
        <button className="Avatar">
            <img className="Avatar-Icon" {...rest} />
            <h3 className="Avatar-Name">{children}</h3>
        </button>
    )
}