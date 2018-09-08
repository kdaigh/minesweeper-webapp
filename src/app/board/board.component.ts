import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { minefield } from '../models/minefield';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges {
  @Input() boardWidth: number;
  @Input() boardHeight: number;
  @Input() mines: number;
  flagCount;
  timerCount;
  changeLog: string[] = [];

  constructor() { }

  ngOnChanges() {
    this.createBoard();
  }

  updateTimer()
  {
    this.timerCount++;
  }

  
  createBoard()
  {
    const mineField = new minefield(this.boardHeight, this.boardWidth);
    if (this.mines == 0) //Page startup
    {
      this.flagCount = "";
    }
    else //"New Game" click
    {
      this.flagCount = this.mines;
      //Start timer
    }
    this.placeAllMines(minefield);
    this.placeAllNumbers(minefield);
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
