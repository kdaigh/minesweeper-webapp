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
    /**
     * @pre There must be a board in existence
     * @post Reveals the tile if it is not already revealed
     */
    revealTile() {
        if (this.isRevealed === false){
            this.isRevealed = true;
        }
    }
    flagTile(){
        if(this.isFlagged === false){
            this.isFlagged = true;
        }
    }
}