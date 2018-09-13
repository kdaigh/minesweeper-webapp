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

    revealTile() {
        if (this.isRevealed === false){
            this.isRevealed = true;
        }
<<<<<<< HEAD
        if (this.isBomb) {
           setTimeout(() => alert("YOU LOSE BITCH"), 500);
        }
    }
=======
        // if (this.isBomb) {
        //    setTimeout(() => alert("GAME OVER"), 500);
        // }
        
        }
>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d

    flagTile(){
        if(this.isFlagged === false){
            this.isFlagged = true;
        }
    }
}