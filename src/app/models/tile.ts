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
     * Reveals the clicked on tile and updates the tile's member variables and image
     * 
     * Pre: There must be a board in existence
     * 
     * Post: Reveals the tile if it is not already revealed, changes member variables accordingly
     */
    revealTile() {
        if (this.isRevealed === false && !this.isFlagged){
            this.isRevealed = true;
        }
    }

    /**
     * Flags the clicked(right click) on tile and updates the tile's image
     * 
     * Pre: There must be a board in existence
     * 
     * Post: Changes member variables and the image of the tile 
     */
    flagTile(){
        if(this.isFlagged === false){
            this.isFlagged = true;
        }
    }
}