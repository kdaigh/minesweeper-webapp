import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { board } from '../models/board';

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
  revealedTilesCount: number;
  isOutOfFlags = false;
  public board: board;

  /**
   * Initializes variables for timer and winning conditions.
   *
   * Pre: None.
   *
   * Post: hasWon, stopTime, isGameOver, simple timer, and flaggedMines have been initalized.
   *
   * @param SimpleTimer Angular class used to display the elapsed time.
   */
  constructor(private st: SimpleTimer) {
    this.hasWon = false;
    this.stopTimer = false;
    this.isGameOver = false;
    this.flaggedMines = 0;
  }

  /**
   * Starts a new game.
   *
   * Pre: User provides valid information and clicks "play game".
   *
   * Post: newGame is called, initializes properties for new game.
   */
  ngOnChanges() {
    this.newGame();
  }

  /**
   * Initializes properties for a new game.
   *
   * Pre: User input has changed.
   *
   * Post: flagCount, isGameOver, hasWon, revealedTiles, flaggedMines, board, and the timer component has been initalized.
   */
  newGame() {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.isGameOver = false;
    this.hasWon = false;
    this.flaggedMines = 0;
    this.revealedTilesCount = 0;
    this.setupTimer();
    this.board = new board(this.rowCount, this.columnCount, this.mineCount);

  }

  /**
   * Resets timerCount and subscribes the timer.
   *
   * Pre: newGame has been called.
   *
   * Post: timerCount is reset and the timer is subscribed.
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
   * Pre: setupTimer has been called
   *
   * Post: Timer is unsubscribed on application startup, timer is subscribed otherwise
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
   * Iterates the timerCount, converts value to a digital clock format, updates digitalTimer.
   *
   * Pre: Timer has been subscribed.
   *
   * Post: timerCount has been iterated, digitalTimer correctly represents the time elapsed.
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

  /**
   * Checks all conditions on current tile, places flag and adjusts flag count as necessary.
   *
   * Pre: The board exists.
   *
   * Post: flag is placed if allowed, if not alert will pop up if not flags remaining.
   */
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
          this.board.isGameOver = true;
          this.gameOverDialog();
        }
      }
      else if (this.flagCount === 0 && !this.board.rows[row][col].isRevealed) {
        alert("No flags remaining, remove a flag and try again.");
      }
    }
  }

  /**
   * Determines revealing behavior of a left-clicked tile.
   *
   * Pre: User left-clicks a tile and game is not over.
   *
   * Post: tile is revealed, game ends if it's a mine.
   *
   * @param row The row of the tile being flagged.
   *
   * @param col The column of the tile being flagged.
   */
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
        this.board.recursive_reveal(row, col);
      }
      else { // non-flag, non-bomb tile was clicked, reveal tile
        this.board.rows[row][col].isRevealed = true;
        this.board.recursive_reveal(row, col);
      }
    }
  }

  /**
   * Presents dialogue at the end of the game.
   *
   * Pre: Game has been completed.
   *
   * Post: Stops timer and lets user know if they won or lost.
   */
  gameOverDialog(): void {
    this.stopTimer = true;
    if (this.hasWon) {
      setTimeout(() => alert("Congratulations! You win!"), 500);
    }
    else {
      setTimeout(() => alert("We all encounter failures in our lives."), 500);
    }
  }
  cheating(): void {
    this.board.cheat_reveal();
  }
}
