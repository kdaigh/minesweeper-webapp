export class tile {
    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    id: string;
    constructor() {
        this.isRevealed = true;
        this.isBomb = false;
        this.isFlagged = false;
        this.id = "0";
    }
}