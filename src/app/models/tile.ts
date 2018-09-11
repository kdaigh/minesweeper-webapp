export class tile {
    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    id: string;
    constructor() {
        this.isRevealed = false;
        this.isBomb = false;
        this.isFlagged = false;
        this.id = "test";
    }

    revealTile() {
        if (this.isRevealed === false){
            this.isRevealed = true;
        }
        if (this.isBomb) {
           setTimeout(() => alert("YOU LOSE BITCH"), 500);
        }
        
    }

    flagTile() {
        if (this.isFlagged === false){
            this.isFlagged = true;
        }
    }
}