export const PLAYER = {
    BLACK: -1, // Black starts at the bottom of the screen, so they move up
    WHITE: +1, // White starts at the top of the screen, so they move down
}

export const BOARD_SIZE = 8;
export const DISCS_PER_PLAYER = 12;

export const AI_MOVE_DELAY_MS = 300;

export const DISCS_STORAGE_KEY = "DISCS";

export const GAME_STATUS = {
    PENDING: "PENDING",
    WIN: "WIN",
    LOSE: "LOSE",
}
