import {useEffect, useState} from "react";

import {GAME_STATUS} from "../const";

import "./Banner.css";
import Button from "./Button";

const Banner = ({gameStatus, restartGame}) => {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (gameStatus === GAME_STATUS.PENDING) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    }, [gameStatus]);

    if (hidden) {
        return null;
    }

    const title = gameStatus === GAME_STATUS.WIN
        ? "You win! Congratulations!"
        : "Game over, you lose.";

    return (
        <div
            className="banner-bg"
            onClick={() => setHidden(true)}
        >
            <div className="banner">
                <h1 className="title">{title}</h1>
                <p className="subtitle">Would you like to try again?</p>
                <div className="buttons-wrapper">
                    <Button
                        title="No"
                        onClick={() => setHidden(true)}
                    />
                    <Button
                        title="Yes"
                        onClick={restartGame}
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner;