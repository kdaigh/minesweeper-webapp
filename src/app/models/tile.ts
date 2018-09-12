export class tile {
    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    adjBombs: number;
    row: number;
    col: number;
    constructor(row: number, col: number) {
        this.isRevealed = false;
        this.isBomb = false;
        this.isFlagged = false;
        this.row = row;
        this.col = col;
        this.adjBombs = 0;
    }
}