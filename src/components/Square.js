import "./Square.css";

const Square = ({color, droppable, onDrop, children}) => {
    const allowDrop = (e) => {
        if (droppable) {
            e.preventDefault();
        }
    }

    const className = `square ${droppable ? "droppable" : color}`;
    return (
        <div
            className={className}
            onDrop={onDrop}
            onDragOver={allowDrop}
        >
            {children}
        </div>
    )
}

export default Square;