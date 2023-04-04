import "./Button.css";

const Button = ({className, title, onClick}) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;