import {PLAYER} from "../const";

import "./Disc.css";

const Disc = ({
                  player,
                  king,
                  draggable,
                  onDragStart,
                  onDragEnd,
                  onMouseOver,
                  onMouseOut,

              }) => {
    const discColor = player === PLAYER.WHITE ? "white" : "black";
    const discClassName = `disc ${discColor}${draggable ? " draggable" : ""}${king ? " king" : ""}`;

    return (
        <div
            className={discClassName}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            {king ? "K" : ""}
        </div>
    )
}

export default Disc;