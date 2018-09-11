<<<<<<< HEAD
import { BoardComponent } from "../board/board.component";

=======
>>>>>>> 16ea8c16492b295c0f79a2811a2035fc86178b63

export class tile {
    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    id: string;
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
        if (this.isBomb) {
           setTimeout(() => alert("YOU LOSE BITCH"), 500);
        }
    }
}