import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { board } from '../models/board'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges {
  @Input() columnCount: number;
  @Input() rowCount: number;
  @Input() mineCount: number;
  @Input() num: number;
  flaggedMines: number;
  flagCount;
  timerCount;
  hasWon: boolean;
  isGameOver: boolean;
  revealedTiles: number;
  digitalTimer: string;
  stopTimer: boolean;
  timerID: string;
  public board: board;

  constructor(private st: SimpleTimer)
  {
    this.hasWon = false;
    this.stopTimer = false;
    this.isGameOver = false;
    this.revealedTiles = 0;
    this.flaggedMines = 0;
  }

  ngOnChanges() {
    this.newGame();
  }

  newGame()
  {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.isGameOver = false;
    this.setupTimer();
    this.board = new board(this.rowCount, this.columnCount, this.mineCount);
  }

  setupTimer()
  {
    this.stopTimer = false;
    this.timerCount = 0; //Reset timer count
    if (this.timerID == undefined) //If timer has not been subscribed
    {
      this.st.newTimer('Timer', 1);
      this.subscribeTimer();
    }
  }

  subscribeTimer()
  {
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
    if(!this.stopTimer) {
      this.timerCount++;

      /////////////////////Update digital timer string/////////////////////

      this.digitalTimer = ""; //Reset value

      //Initializations
      var minutes = Math.floor(this.timerCount / 60);
      var hours = Math.floor(minutes / 60);
      if (hours > 0)
      {
        minutes = minutes - hours * 60;
      }
      var seconds = this.timerCount % 60;

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
      else if (!this.board.rows[row][col].isFlagged && this.flagCount > 0){ // place flag
        this.board.rows[row][col].isFlagged = true;
        this.flagCount--;
        if(this.board.rows[row][col].isBomb) {
          this.flaggedMines++;
        }
        if(this.flaggedMines === this.mineCount) {
          this.hasWon = true;
          this.isGameOver = true;
          this.gameOverDialog();
        }
      }
      else {
        alert("No flags remaining, remove a flag and try again");
      }
    }
  }

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
    }
  }
  
  // Checks all conditions of the board and calculates if the game is complete.
  gameOverDialog(): void {
    this.timerCount = 0;
    this.stopTimer = true;
    if (this.hasWon) {
      alert("YOU WIN BITCH");
    }
    else {
      alert("YOU LOSE BITCH");
    }
  }
}
