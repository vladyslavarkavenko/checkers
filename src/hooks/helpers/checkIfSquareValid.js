import {BOARD_SIZE} from "../../const";

export const checkIfSquareValid = (rowIndex, columnIndex) => {
    return (rowIndex >= 0 && rowIndex < BOARD_SIZE) &&
           (columnIndex >= 0 && columnIndex < BOARD_SIZE)
}