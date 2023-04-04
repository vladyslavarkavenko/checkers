import {useEffect, useMemo, useState} from "react";

import {GAME_STATUS, PLAYER} from "../const";
import {getInitialDiscs} from "./helpers/getInitialDiscs";
import {getPossibleMoves} from "./helpers/getPossibleMoves";

const useCheckerGame = (initialDiscs) => {
    const [turn, setTurn] = useState(PLAYER.BLACK);
    const [discs, setDiscs] = useState(initialDiscs || getInitialDiscs());

    const playerDiscs = useMemo(() => {
        const playerDiscs = {
            [PLAYER.WHITE]: [],
            [PLAYER.BLACK]: [],
        }

        for (let rowIndex = 0; rowIndex < discs.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < discs[rowIndex].length; columnIndex++) {
                const disc = discs[rowIndex][columnIndex];
                if (disc) {
                    playerDiscs[disc.player].push({
                        ...disc,
                        rowIndex,
                        columnIndex,
                    });
                }
            }
        }

        return playerDiscs;
    }, [discs]);

    const possibleMoves = useMemo(() => {
        const possibleMoves = {};

        [PLAYER.WHITE, PLAYER.BLACK].forEach(player => {
            possibleMoves[player] = {
                captureMoves: [],
                nonCaptureMoves: [],
            };
            playerDiscs[player].forEach(playerDisc => {
                const playerPossibleMoves = getPossibleMoves(playerDisc, discs);
                playerPossibleMoves.forEach(move => {
                    if (move.capture.length) {
                        possibleMoves[player].captureMoves.push(move);
                    } else {
                        possibleMoves[player].nonCaptureMoves.push(move);
                    }
                });
            })
        });

        return possibleMoves;
    }, [playerDiscs]);

    const [gameStatus, setGameStatus] = useState(GAME_STATUS.PENDING);
    useEffect(() => {
        [PLAYER.WHITE, PLAYER.BLACK].forEach(player => {
            const playerPossibleMoves = possibleMoves[player];
            if (playerPossibleMoves.captureMoves.length === 0 && playerPossibleMoves.nonCaptureMoves.length === 0) {
                setGameStatus(player === PLAYER.BLACK ? GAME_STATUS.LOSE : GAME_STATUS.WIN);
            }
        });
    }, [possibleMoves])

    const restart = () => {
        setTurn(PLAYER.BLACK);
        setDiscs(getInitialDiscs());
        setGameStatus(GAME_STATUS.PENDING);
    }

    const makeMove = (player, move) => {
        if (turn !== player) {
            return;
        }

        const {rowIndex, columnIndex, newRowIndex, newColumnIndex, capture, becomeKing} = move;

        const newDiscs = discs.map(row => row.slice());

        // Move disc
        newDiscs[newRowIndex][newColumnIndex] = newDiscs[rowIndex][columnIndex];
        newDiscs[rowIndex][columnIndex] = null;

        // Check if disc should become king
        if (becomeKing) {
            newDiscs[newRowIndex][newColumnIndex].king = true;
        }

        // Remove all captured discs
        capture.forEach(capturedDisc => {
            newDiscs[capturedDisc.rowIndex][capturedDisc.columnIndex] = null;
        })

        setDiscs(newDiscs);
        setTurn(player === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK);
    }

    return {
        turn,
        discs,
        gameStatus,
        possibleMoves,
        restart,
        makeMove,
    }
}

export default useCheckerGame;