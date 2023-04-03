import "./CustomButton.css";

export default function CustomButton(props) {
    const { children, ...rest } = props;
    return (
        <button className="custom-button">
            <img className="Button-Icon" {...rest} />
            <h1>{children}</h1>
        </button>
    )
}