import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
<<<<<<< HEAD
import { tile } from '../models/tile';
import { board } from '../models/board';
import { TileComponent } from '../tile/tile.component';
=======
import { board } from '../models/board'
>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnChanges {
  @Input() columnCount: number;
  @Input() rowCount: number;
  @Input() mineCount: number;
  @Input() num: number;
<<<<<<< HEAD
  flagCount: number;
=======
  flaggedMines: number;
  flagCount;
>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d
  timerCount;
  hasWon: boolean;
  isGameOver: boolean;
  revealedTiles: number;
  digitalTimer: string;
  stopTimer: boolean;
  timerID: string;
  isOutOfFlags = false;
  public board: board;
<<<<<<< HEAD
  provider: [tile]
  constructor(private st: SimpleTimer)
  {

    
  }

  createBoard()
   {
    this.board = new board();
    
    //Setup new board
     for (var i = 0; i < this.rowCount; i++)
     {
       var row: tile[] = [];

       for (var j = 0; j < this.columnCount; j++)
       {
          row.push(new tile(i,j)); //Append new tile to row
       }
       
       this.board.rows.push(row); //Append new row to board
     }
     this.placeMines();
     document.addEventListener('contextmenu', event => event.preventDefault());
     if(this.flagCount === 0){
       
     }
   }

=======

  constructor(private st: SimpleTimer) {
    this.hasWon = false;
    this.stopTimer = false;
    this.isGameOver = false;
    this.revealedTiles = 0;
    this.flaggedMines = 0;
  }

>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d
  ngOnChanges() {
    this.newGame();
  }

  /**
   * @pre 
   */
  newGame() {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.isGameOver = false;
    this.hasWon = false;
    this.revealedTiles = 0;
    this.flaggedMines = 0;
    this.setupTimer();
    this.board = new board(this.rowCount, this.columnCount, this.mineCount);
  }

  setupTimer() {
    this.stopTimer = false;
    this.timerCount = 0; //Reset timer count
    if (this.timerID == undefined) //If timer has not been subscribed
    {
      this.st.newTimer('Timer', 1);
      this.subscribeTimer();
    }
  }

  subscribeTimer() {
    if (this.mineCount == 0) //Page startup
    {
      this.st.unsubscribe(this.timerID);
      this.timerID = undefined;
    }
    else
    {
      this.stopTimer = false;
      this.timerID = this.st.subscribe('Timer', () => this.updateTimer());
    }
  }

  updateTimer()
  {
<<<<<<< HEAD
    this.timerCount++;
  }

  updateFlag(){
    this.flagCount--;
    if(this.flagCount === 0){
      this.isOutOfFlags = true;
    }
  }


  //returns the current tile you are on.
  getTile()
  {
    return;
  }
=======
    if(!this.stopTimer) {
      this.timerCount++;
>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d

      /////////////////////Update digital timer string/////////////////////

      this.digitalTimer = ""; //Reset value

      //Initializations
      let minutes = Math.floor(this.timerCount / 60);
      let hours = Math.floor(minutes / 60);
      if (hours > 0)
      {
        minutes = minutes - hours * 60;
      }
      let seconds = this.timerCount % 60;

      //If time has exeeded 1 hour
      if (hours != 0)
      {
        this.digitalTimer += hours + ":"; //Add hours

        if (minutes < 10)
        {
          this.digitalTimer += "0"; //Add minutes leading zero if needed
        }
        this.digitalTimer += minutes + ":"; //Add minutes

        if (seconds < 10)
        {
          this.digitalTimer += "0"; //Add seconds leading zero if needed
        }
        this.digitalTimer += seconds;
      }

      //If time has not exeeded 1 hour
      else
      {
        if (minutes != 0) //If time has exeeded 1 minute
        {
          this.digitalTimer += minutes + ":";

          if (seconds < 10)
          {
            this.digitalTimer += "0"; //Add seconds leading zero if needed
          }
        }
        this.digitalTimer += seconds;
      }
    }
  }

  flagCheck(row: number, col: number) {
    if(!this.isGameOver) {
      if(this.board.rows[row][col].isFlagged) { // flag is already placed, so remove flag and add to flag count
        this.board.rows[row][col].isFlagged = false;
        this.flagCount++;
        if(this.board.rows[row][col].isBomb) {
          this.flaggedMines--; 
        }
      }
      else if (!this.board.rows[row][col].isFlagged && this.flagCount > 0) { // place flag
        this.board.rows[row][col].isFlagged = true;
        this.flagCount--;
        if(this.board.rows[row][col].isBomb) {
          this.flaggedMines++;
        }
        if(this.flaggedMines === this.mineCount) { // check for win
          this.hasWon = true;
          this.isGameOver = true;
          this.gameOverDialog();
        }
      }
      else {
        alert("No flags remaining, remove a flag and try again.");
      }
    }
  }

<<<<<<< HEAD
  boundsCheck(row: number, col: number): boolean {
    console.log("row: " + row + "col: " + col);
    console.log(this.flagCount);
    if(row < 0 || row > this.rowCount-1 || col < 0 || col > this.columnCount-1) {
      return false;
    }
    else {
      return true;
=======
  tileCheck(row: number, col: number) {
    if(!this.isGameOver) {
      if(this.board.rows[row][col].isBomb) { // bomb was clicked, end game
        this.board.revealMines();
        this.isGameOver = true;
        this.gameOverDialog();
      }
      else if(this.board.rows[row][col].isFlagged) { // flagged tile was clicked but wasn't a bomb
        this.board.rows[row][col].isFlagged = false;
        this.board.rows[row][col].isRevealed = true;
        this.flagCount++;
        this.revealedTiles++;
        this.board.placeNumber(row, col);
      }
      else { // non-flag, non-bomb tile was clicked, reveal tile
        this.revealedTiles++
        this.board.rows[row][col].isRevealed = true;
        this.board.placeNumber(row, col);
      }
>>>>>>> ceeae3af353c7e63a97bb5377015fd3cbb80c07d
    }
  }
  
  // Checks all conditions of the board and calculates if the game is complete.
  gameOverDialog(): void {
    this.timerCount = 0;
    this.stopTimer = true;
    if (this.hasWon) {
      alert("Congratulations! You win!");
    }
    else {
      alert("We all encounter failures in our lives.");
    }
  }

  // After game ends, show the user how many bombs they flagged and how long the game took
  showGameStats(flagMineCount: number, timeCount: number)
  {
    //Show user how many mines they flagged, how long it took them to complete
    //Call inside gameOverDialog()
    //Clear input boxes, return to initial page

  }
}
