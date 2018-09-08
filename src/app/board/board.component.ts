import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { minefield } from '../models/minefield';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges{
  @Input() boardWidth: number;
  @Input() boardHeight: number;
  @Input() mines: number;
  flagCount;
  timerCount;
  timerID: string;
  changeLog: string[] = [];

  constructor(private st: SimpleTimer) { }

  ngOnChanges() {
    this.createBoard();
  }

  createBoard()
  {
    console.log("createBoard() called");
    this.timerCount = 0; //Reset timer count
    if (this.mines != 0) //Not page startup
    {
      const mineField = new minefield(this.boardHeight, this.boardWidth);
      this.flagCount = this.mines;
      if (this.timerID == undefined) //If timer has not been subscribed
      {
        this.st.newTimer('Timer', 1);
        this.subscribeTimer();
      }
    }
  }

  /*     this.placeAllMines(minefield);
    this.placeAllNumbers(minefield); */



  subscribeTimer()
  {
    if (this.mines == 0) //Page startup
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
  }

  //returns the current tile you are on.
  getTile()
  {
    return;
  }

  //Places a random mine on the board
  placeMine(ninefield)
  {

  }

  //Loop calls place mine to populate the board with random mines
  placeAllMines(minefield)
  {

  }

  //Calculate what number to put in the tile.
  placeNumber(minefield, row, col)
  {

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
  boardComtroller($scope)
  {

  }

}
