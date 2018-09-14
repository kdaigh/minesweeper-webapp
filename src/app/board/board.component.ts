import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { board } from '../models/board';
import { tile } from '../models/tile';

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
  flaggedMines: number;
  flagCount;
  timerCount: number;
  hasWon: boolean;
  isGameOver: boolean;
  digitalTimer: string;
  stopTimer: boolean;
  timerID: string;
  isOutOfFlags = false;
  public board: board;

  constructor(private st: SimpleTimer) {
    this.hasWon = false;
    this.stopTimer = false;
    this.isGameOver = false;
    this.flaggedMines = 0;
  }

  ngOnChanges() {
    this.newGame();
  }

  /**
   * Initializes properties for a new game
   * 
   * @pre: User input has changed
   * 
   * @post: flagCount, isGameOver, hasWon, revealedTiles, flaggedMines, board, and the timer component has been initalized
   */
  newGame() {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.isGameOver = false;
    this.hasWon = false;
    this.flaggedMines = 0;
    this.setupTimer();
    this.board = new board(this.rowCount, this.columnCount, this.mineCount);
    
  }

  /**
   * Resets timerCount and subscribes the timer
   * 
   * @pre: newGame has been called
   * 
   * @post: timerCount is reset and the timer is subscribed
   */
  setupTimer() {
    this.stopTimer = false;
    this.timerCount = 0; //Reset timer count
    if (this.timerID == undefined) //If timer has not been subscribed
    {
      this.st.newTimer('Timer', 1);
      this.subscribeTimer();
    }
  }

  /**
   * Unsubscribes timer on application startup, subscribes timer when called otherwise
   * 
   * @pre: setupTimer has been called
   * 
   * @post: Timer is unsubscribed on application startup, timer is subscribed otherwise
   */
  subscribeTimer() {
    if (this.mineCount == 0) //Application startup
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

  /**
   * Iterates the timerCount, converts value to a digital clock format, updates digitalTimer
   * 
   * @pre: Timer has been subscribed
   * 
   * @post: timerCount has been iterated, digitalTimer correctly represents the time elapsed
   */
  updateTimer()
  {
    if(!this.stopTimer) {
      this.timerCount++;

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
      else if (!this.board.rows[row][col].isFlagged && this.flagCount > 0 && !this.board.rows[row][col].isRevealed) { // place flag
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
      else if (this.flagCount === 0 && !this.board.rows[row][col].isRevealed) {
        alert("No flags remaining, remove a flag and try again.");
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
        //this.revealedTiles++;
        this.board.placeNumber(row, col);
      }
      else { // non-flag, non-bomb tile was clicked, reveal tile
        //this.revealedTiles++
        this.board.rows[row][col].isRevealed = true;
        this.board.placeNumber(row, col);
      }
    }
  }
  
  // Checks all conditions of the board and calculates if the game is complete.
  gameOverDialog(): void {
    this.stopTimer = true;
    if (this.hasWon) {
      setTimeout(() => alert("Congratulations! You win!"), 500);
    }
    else {
      setTimeout(() => alert("We all encounter failures in our lives."), 500);
    }
    console.log(this.board.tilesRevealed);
    //this.timerCount = 0;
  }
  
  generate_table() {
    // get the reference for the body
    var body = document.getElementsByName("minefield")[0];
   
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    // creating all cells
    for (var i = 0; i < this.rowCount; i++) {
      // creates a table row
      var row = document.createElement("tr");
   
      for (var j = 0; j < this.columnCount; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var obj = document.createElement("tileObj");
        cell.appendChild(obj);
        row.appendChild(cell);
      }
   
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
   
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }

}
