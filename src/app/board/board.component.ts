import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { tile } from '../models/tile';
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
  flagCount;
  timerCount;
  digitalTimer: string;
  timerID: string;
  public board: board;

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
       document.addEventListener('contextmenu', event => event.preventDefault());
       this.board.rows.push(row); //Append new row to board
     }
     this.placeMines();
   }

  ngOnChanges() {
    this.newGame();
  }

  newGame()
  {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.setupTimer();
    this.createBoard();
  }

  setupTimer()
  {
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
      this.timerID = this.st.subscribe('Timer', () => this.updateTimer());
    }
  }

  updateTimer()
  {
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

  //returns the current tile you are on.
  getTile()
  {
    return;
  }

  //Places a random mine on the board
  placeMine(minefield)
  {

  }

  //Calculate what number to put in the tile.
  placeNumber(row: number, col: number): void
  {
    let bombCount = 0;
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
    this.board.rows[row][col].adjBombs = bombCount;
  }

  boundsCheck(row: number, col: number): boolean {
    console.log("row: " + row + "col: " + col);
    if(row < 0 || row > this.rowCount-1 || col < 0 || col > this.columnCount-1) {
      return false;
    }
    else {
      return true;
    }
  }

  bombCheck(row: number, col: number): boolean {
    console.log(this.board.rows[row][col].isBomb);
    if (this.board.rows[row][col].isBomb) {
      return true
    } 
    else {
      return false;
    }
  }

  //Loop calls placeNumber to fill in all required tiles with numbers.
  placeAllNumbers(minefield)
  {
    
  }
  
  //Checks all conditions of the board and calculates if the game is complete.
  isGameOver()
  {

  }

  //Function that creates board and operates the functions.
  boardController($scope)
  {

  }


  placeMines()
  {
    var mines_placed = 0;
    while(mines_placed < this.mineCount)
    {
      var mine_row = Math.floor(Math.random() * this.rowCount) + 0;
      var mine_col = Math.floor(Math.random() * this.columnCount) + 0;
      if (this.board.rows[mine_row][mine_col].isBomb == false)
      {
        this.board.rows[mine_row][mine_col].isBomb = true;
        mines_placed++;
      }
    }
  }
}
