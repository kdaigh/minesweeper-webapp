export class tile {
    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    id: string;
    constructor(isRevealed, isBomb, isFlagged, id) {
        this.isRevealed = isRevealed;
        this.isBomb = isBomb;
        this.isFlagged = isFlagged;
        this.id = id;
    }
}