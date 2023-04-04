import {BOARD_SIZE, DISCS_PER_PLAYER, PLAYER} from "../../const";

export const getInitialDiscs = () => {
    const discs = Array.from({length: BOARD_SIZE}).map(() =>
        Array.from({length: BOARD_SIZE}).map(() => null)
    )

    // Place white discs at the top
    for (let i = 0; i < DISCS_PER_PLAYER; i++) {
        const rowIndex = Math.floor(i / (BOARD_SIZE / 2));
        const columnIndex = (i * 2 + rowIndex + 1) % BOARD_SIZE;

        discs[rowIndex][columnIndex] = {
            player: PLAYER.WHITE,
            king: false,
        };
    }

    // Place black discs at the bottom
    for (let j = 0; j < DISCS_PER_PLAYER; j++) {
        const rowIndex = (BOARD_SIZE - 1) - Math.floor(j / (BOARD_SIZE / 2));
        const columnIndex = (BOARD_SIZE - 1) - (j * 2 + rowIndex) % BOARD_SIZE;

        discs[rowIndex][columnIndex] = {
            player: PLAYER.BLACK,
            king: false,
        };
    }

    return discs;
}
