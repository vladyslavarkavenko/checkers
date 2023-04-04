import {useEffect, useMemo} from "react";

import {PLAYER, AI_MOVE_DELAY_MS, DISCS_STORAGE_KEY} from "../const";
import Board from "./Board";
import {delValue, getValue, setValue} from "../services/storage";
import useCheckerGame from "../hooks/useCheckerGame";
import {getBestMove} from "../hooks/helpers/getBestMove";
import Banner from "./Banner";

import "./Game.css";
import Button from "./Button";

const Game = () => {
    // Sync game with persistent storage
    const {
        turn,
        discs,
        gameStatus,
        possibleMoves,
        restart,
        makeMove,
    } = useCheckerGame(getValue(DISCS_STORAGE_KEY));

    useEffect(() => {
        setValue(DISCS_STORAGE_KEY, discs)
    }, [discs]);

    const restartGame = () => {
        restart();
        delValue(DISCS_STORAGE_KEY);
    }

    const playerPossibleMoves = useMemo(() => {
        // Don't allow to move if not players' turn
        if (turn === PLAYER.WHITE) {
            return [];
        }

        // Force capture moves
        const {captureMoves, nonCaptureMoves} = possibleMoves[PLAYER.BLACK];
        return captureMoves.length ? captureMoves : nonCaptureMoves;
    }, [turn, possibleMoves]);

    // Automatically make move by enemy
    useEffect(() => {
        if (turn === PLAYER.WHITE) {
            // Make artificial delay for better UX
            setTimeout(() => {
                const possibleEnemyMoves = possibleMoves[PLAYER.WHITE];
                const move = getBestMove(possibleEnemyMoves);
                if (move) {
                    makeMove(PLAYER.WHITE, move);
                }
            }, AI_MOVE_DELAY_MS);
        }
    }, [turn]);

    return (
        <>
            <Board
                discs={discs}
                possibleMoves={playerPossibleMoves}
                makeMove={(move) => makeMove(PLAYER.BLACK, move)}
            />
            <Button
                className="restart-game"
                title="Restart game"
                onClick={restartGame}
            />
            <Banner
                gameStatus={gameStatus}
                restartGame={restartGame}
            />
        </>
    );
}

export default Game;
