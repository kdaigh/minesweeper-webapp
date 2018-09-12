import { tile } from "./tile";

export class board
{
    public rows: any[];
    public rowCount: number;
    public colCount: number;
    public mineCount: number;
    public gameOver: boolean;

    constructor(rows: number, cols: number, mines: number) {
        this.rowCount = rows;
        this.colCount = cols;
        this.mineCount = mines;
        this.gameOver = false;
        this.rows = [];
        for (var i = 0; i < this.rowCount; i++) {
        var row: tile[] = [];
        for (var j = 0; j < this.colCount; j++) {
            row.push(new tile(i,j)); //Append new tile to row
        }
        document.addEventListener('contextmenu', event => event.preventDefault());
        this.rows.push(row); //Append new row to board

     }
    this.placeMines();
    }

    placeMines()
    {
      var mines_placed = 0;
      while(mines_placed < this.mineCount)
      {
        var mine_row = Math.floor(Math.random() * this.rowCount) + 0;
        var mine_col = Math.floor(Math.random() * this.colCount) + 0;
        if (this.rows[mine_row][mine_col].isBomb == false)
        {
          this.rows[mine_row][mine_col].isBomb = true;
          mines_placed++;
        }
      }
    }
    //Calculate what number to put in the tile.
  placeNumber(row: number, col: number): void
  {
    let bombCount = 0;
    if(this.rows[row][col].isBomb) {
      this.revealMines();
    }
    if(this.boundsCheck(row-1, col-1)) { // top left tile
      if(this.bombCheck(row-1, col-1)) {
        bombCount++;
      }
    }
    if(this.boundsCheck(row-1, col)) { // top tile
      if(this.bombCheck(row-1, col)) {
        bombCount++;
      }
    }
    if(this.boundsCheck(row-1, col+1)) { // top right tile
      if(this.bombCheck(row-1, col+1))
      bombCount++;
    }
    if(this.boundsCheck(row, col-1)) { // left tile
      if(this.bombCheck(row, col-1))
      bombCount++;
    }
    if(this.boundsCheck(row, col+1)) { // right tile
      if(this.bombCheck(row, col+1)) {
        bombCount++;
      }
    }
    if(this.boundsCheck(row+1, col-1)) { // bottom left tile
      if(this.bombCheck(row+1, col-1)) {
        bombCount++;
      }
    }
    if(this.boundsCheck(row+1, col)) { // bottom tile
      if(this.bombCheck(row+1, col)) {
        bombCount++;
      }
    }
    if(this.boundsCheck(row+1, col+1)) { // bottom right tile
      if(this.bombCheck(row+1, col+1)) {
        bombCount++;
      }
    }
    this.rows[row][col].adjBombs = bombCount;
  }

  boundsCheck(row, col): boolean {
    console.log("row: " + row + "col: " + col);
    if(row < 0 || row > this.rowCount-1 || col < 0 || col > this.colCount-1) {
      return false;
    }
    else {
      return true;
    }
  }

  bombCheck(row: number, col: number): boolean {
    if (this.rows[row][col].isBomb) {
      return true
    } 
    else {
      return false;
    }
  }
 
  revealMines() {
      for(let i = 0; i < this.rowCount; i++) {
          for(let j = 0; j < this.colCount; j++) {
              if(this.rows[i][j].isBomb) {
                  this.rows[i][j].isRevealed = true;
              }
          }
      }
    this.gameOver = true;
  }
  recursive_reveal(row: number, col: number) : void
  {
    this.placeNumber(row, col);
    if (!(this.rows[row][col].adjBombs > 0))
    {
      if (this.boundsCheck(row - 1, col - 1)) { // top left tile
        if (!this.rows[row - 1][col - 1].isBomb && !this.rows[row - 1][col - 1].isRevealed) {
          if (this.rows[row - 1][col - 1].adjBombs > 0) {

            this.rows[row - 1][col - 1].revealTile();

          }
          else {
            this.rows[row - 1][col - 1].revealTile();
            this.recursive_reveal(row - 1, col - 1);

          }
        }
      }
      if (this.boundsCheck(row - 1, col)) { // top tile
        if (!this.rows[row - 1][col].isBomb && !this.rows[row - 1][col].isRevealed) {
          if (this.rows[row - 1][col].adjBombs > 0){
            
            this.rows[row - 1][col].revealTile();
            
          }
          else{
            this.rows[row - 1][col].revealTile();
            this.recursive_reveal(row - 1, col);
            
          }
        }
      }
      if (this.boundsCheck(row - 1, col + 1)) { // top right tile
        if (!this.rows[row - 1][col + 1].isBomb && !this.rows[row - 1][col + 1].isRevealed) {
          if (this.rows[row - 1][col + 1].adjBombs > 0) {

            this.rows[row - 1][col + 1].revealTile();

          }
          else {
            this.rows[row - 1][col + 1].revealTile();
            this.recursive_reveal(row - 1, col + 1);

          }
        }
      }
      if (this.boundsCheck(row, col - 1)) { // left tile 
        if (!this.rows[row][col - 1].isBomb && !this.rows[row][col - 1].isRevealed){
          if (this.rows[row][col - 1].adjBombs > 0) {
            this.rows[row][col - 1].revealTile();
            
          }
          else {
            this.rows[row][col - 1].revealTile();
            this.recursive_reveal(row, col - 1);
          }
        }
      }
      if (this.boundsCheck(row, col + 1)) { // right tile
        if (!this.rows[row][col + 1].isBomb && !this.rows[row][col + 1].isRevealed) {
          if (this.rows[row][col + 1].adjBombs > 0) {
            this.rows[row][col + 1].revealTile();
          }
          else {
            this.rows[row][col + 1].revealTile();
            this.recursive_reveal(row, col + 1);
          }
        }
      }
    if (this.boundsCheck(row + 1, col)) { // bottom tile
        if (!this.rows[row + 1][col].isBomb && !this.rows[row + 1][col].isRevealed) {
          if (this.rows[row + 1][col].adjBombs > 0) {
            this.rows[row + 1][col].revealTile();
          }
          else {
            this.rows[row + 1][col].revealTile();
            this.recursive_reveal(row + 1, col);
          }
        }
      }
      if (this.boundsCheck(row + 1, col - 1)) { // bottom left tile
        if (!this.rows[row + 1][col - 1].isBomb && !this.rows[row + 1][col - 1].isRevealed) {
          if (this.rows[row + 1][col - 1].adjBombs > 0) {

            this.rows[row + 1][col - 1].revealTile();

          }
          else {
            this.rows[row + 1][col - 1].revealTile();
            this.recursive_reveal(row + 1, col - 1);
          }
        }
      }
      if (this.boundsCheck(row + 1, col + 1)) { // bottom right tile
        if (!this.rows[row + 1][col + 1].isBomb && !this.rows[row + 1][col + 1].isRevealed) {
          if (this.rows[row + 1][col + 1].adjBombs > 0) {

            this.rows[row + 1][col + 1].revealTile();

          }
          else {
            this.rows[row + 1][col + 1].revealTile();
            this.recursive_reveal(row + 1, col + 1);

          }
        }
      }
    }
  }
}
