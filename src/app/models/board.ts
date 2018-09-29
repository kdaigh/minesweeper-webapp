import { tile } from "./tile";

export class board
{
    public isGameOver: boolean;
    public rows: any[];
    public rowCount: number;
    public colCount: number;
    public mineCount: number;
    public tilesRevealed: number;

    constructor(rows: number, cols: number, mines: number) {
        this.rowCount = rows;
        this.colCount = cols;
        this.mineCount = mines;
        this.tilesRevealed = 0;
        this.isGameOver = false;
        this.rows = [];
        for (let i = 0; i < this.rowCount; i++) {
        let row: tile[] = [];
        for (let j = 0; j < this.colCount; j++) {
            row.push(new tile(i,j)); //Append new tile to row
        }
        this.rows.push(row); //Append new row to board
     }
    this.placeMines();
    document.addEventListener('contextmenu', event => event.preventDefault());
    }

    /**
     * Given the number of mines the user wanted, places mines at random coordinates.
     *
     * Pre: There must be a board in existence.
     *
     * Post: Places the user-defined number of mines .
     */
    placeMines()
    {
      let mines_placed = 0;
      while(mines_placed < this.mineCount)
      {
        let mine_row = Math.floor(Math.random() * this.rowCount) + 0;
        let mine_col = Math.floor(Math.random() * this.colCount) + 0;
        if (this.rows[mine_row][mine_col].isBomb == false)
        {
          this.rows[mine_row][mine_col].isBomb = true;
          mines_placed++;
        }
      }
    }


  /**
   * Calculates what number to place in every tile, then places the correct number according to how many bombs are adjacent to that tile.
   *
   * Pre: There must be a board in existence.
   *
   * Post: Calculates adjacent bombs to any given tile and places numbers accordingly.
   *
   * @param row The row of the tile that was clicked.
   *
   * @param col The column of the tile that was clicked.
   */
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


  /**
   * For a given tile at coordinates (row, col), checks if the tile is within the bounds of the board.
   *
   * Pre: There must be a board in existence.
   *
   * Post: Returns true if the tile is within the bounds of the board, returns false otherwise.
   *
   * @param row The row of the coordinate to be checked.
   *
   * @param col The column of the coordinate to be checked.
   */
  boundsCheck(row, col): boolean {
    console.log("row: " + row + "col: " + col);
    if(row < 0 || row > this.rowCount-1 || col < 0 || col > this.colCount-1) {
      return false;
    }
    else {
      return true;
    }
  }


  /**
   * For a given tile at coordinates (row, col), checks if the tile is a bomb.
   *
   * Pre: There must be a board in existence.
   *
   * Post: Checks if there is a bomb at the given coordinate.
   *
   * @param row The row of the coordinate to be checked.
   *
   * @param col The column of the coordinate to be checked.
   */
  bombCheck(row: number, col: number): boolean {
    if (this.rows[row][col].isBomb) {
      return true
    }
    else {
      return false;
    }
  }


  /**
   * After the user hits a bomb and the game ends, all of the mines are revealed.
   *
   * Pre: There must be a board in existence.
   *
   * Post: If the user hits a bomb and ends the game, reveals all the mines.
   */
  revealMines() {
      for(let i = 0; i < this.rowCount; i++) {
          for(let j = 0; j < this.colCount; j++) {
              if((this.rows[i][j].isBomb && this.board.rows[i][j].cheatReveal == false) {
                  this.rows[i][j].isRevealed = true;
                  this.isGameOver = true;
              }
              else{
                alert("You cannot play while in cheat mode");
              }
          }
      }
  }


  /**
   * Clicking on a tile calls the recursive reveal function, the function then reveals tiles
   * fanning out in every direction if they are empty or contain a number. Once the function
   * reaches a numbered tile, the recursion stops.
   *
   * Pre: There must be a board in existence.
   *
   * Post: When a tile is clicked, tiles fanning out from the clicked tile are revealed.
   * If the function hits a number in any direction, the revealing/recursion ceases.
   *
   * @param row The row of the clicked tile.
   *
   * @param col The column of the clicked tile.
   */
  recursive_reveal(row: number, col: number) : void
  {
    this.placeNumber(row, col);
    if (!(this.rows[row][col].adjBombs > 0) && !this.isGameOver)
    {
      if (this.boundsCheck(row - 1, col - 1)) { // top left tile
        if (!this.rows[row - 1][col - 1].isBomb && !this.rows[row - 1][col - 1].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row - 1][col - 1].adjBombs > 0) {

            this.rows[row - 1][col - 1].revealTile();
          }
          else {
            this.rows[row - 1][col - 1].revealTile();
            this.recursive_reveal(row - 1, col - 1);
          }
          this.tilesRevealed++;
        }
      }
      if (this.boundsCheck(row - 1, col)) { // top tile
        if (!this.rows[row - 1][col].isBomb && !this.rows[row - 1][col].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row - 1][col].adjBombs > 0){

            this.rows[row - 1][col].revealTile();


          }
          else{
            this.rows[row - 1][col].revealTile();
            this.recursive_reveal(row - 1, col);

          }
          this.tilesRevealed++;
        }
      }
      if (this.boundsCheck(row - 1, col + 1)) { // top right tile
        if (!this.rows[row - 1][col + 1].isBomb && !this.rows[row - 1][col + 1].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row - 1][col + 1].adjBombs > 0) {

            this.rows[row - 1][col + 1].revealTile();
          }
          else {
            this.rows[row - 1][col + 1].revealTile();
            this.recursive_reveal(row - 1, col + 1);

          }
          this.tilesRevealed++;

        }
      }
      if (this.boundsCheck(row, col - 1)) { // left tile
        if (!this.rows[row][col - 1].isBomb && !this.rows[row][col - 1].isRevealed && !this.rows[row][col].isFlagged){
          if (this.rows[row][col - 1].adjBombs > 0) {
            this.rows[row][col - 1].revealTile();

          }
          else {
            this.rows[row][col - 1].revealTile();
            this.recursive_reveal(row, col - 1);
          }
          this.tilesRevealed++;
        }
      }
      if (this.boundsCheck(row, col + 1)) { // right tile
        if (!this.rows[row][col + 1].isBomb && !this.rows[row][col + 1].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row][col + 1].adjBombs > 0) {
            this.rows[row][col + 1].revealTile();
          }
          else {
            this.rows[row][col + 1].revealTile();
            this.recursive_reveal(row, col + 1);
          }
          this.tilesRevealed++;
        }
      }
    if (this.boundsCheck(row + 1, col)) { // bottom tile
      if (!this.rows[row + 1][col].isBomb && !this.rows[row + 1][col].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row + 1][col].adjBombs > 0) {
            this.rows[row + 1][col].revealTile();
          }
          else {
            this.rows[row + 1][col].revealTile();
            this.recursive_reveal(row + 1, col);
          }
        this.tilesRevealed++;
        }
      }
      if (this.boundsCheck(row + 1, col - 1)) { // bottom left tile
        if (!this.rows[row + 1][col - 1].isBomb && !this.rows[row + 1][col - 1].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row + 1][col - 1].adjBombs > 0) {

            this.rows[row + 1][col - 1].revealTile();

          }
          else {
            this.rows[row + 1][col - 1].revealTile();
            this.recursive_reveal(row + 1, col - 1);
          }
          this.tilesRevealed++;
        }
      }
      if (this.boundsCheck(row + 1, col + 1)) { // bottom right tile
        if (!this.rows[row + 1][col + 1].isBomb && !this.rows[row + 1][col + 1].isRevealed && !this.rows[row][col].isFlagged) {
          if (this.rows[row + 1][col + 1].adjBombs > 0) {

            this.rows[row + 1][col + 1].revealTile();

          }
          else {
            this.rows[row + 1][col + 1].revealTile();
            this.recursive_reveal(row + 1, col + 1);

          }
          this.tilesRevealed++;

        }
      }
    }
  }

//does the cheating
cheat_reveal() : void
{
  for(let i = 0; i < this.rowCount ; i++) {
      for(let j = 0; j < this.colCount; j++) {
        this.rows[i][j].cheatreveal();
          }
      }
  }


}
