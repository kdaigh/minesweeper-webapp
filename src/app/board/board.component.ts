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

  createBoard(boardWidth, boardHeight, mines)
  {
    /*
    var board = new Array(boardWidth);
    for (var i = 0; i < boardWidth; i++)
    {
      board[i] = new Array(boardHeight);//create 2D array
    }
     for (var i = 0; i < boardWidth; i++)
     {
       for (var j = 0; j < boardHeight; j++)
       {
         //create tile object
       }
     }
     var count = 0;
     while(count < mines)
     {
       var mine_row = Math.floor(Math.random() * Math.floor(boardWidth));//random number generator
       var mine_col = Math.floor(Math.random() * Math.floor(boardHeight));
      if (tile @ (mine_row,mine_col) !is_mine)
      {
        is_mine = true;//if there isn't already a mine at that spot, place mine
        count++;
      }
     }
     */
    this.timerCount++;
  }

  /*
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
  }
<<<<<<< HEAD
  */
=======

  //returns the current tile you are on.
  getTile()
  {
    return;
  }

  //Places a random mine on the board
  placeMine()
  {

  }

  //Loop calls place mine to populate the board with random mines
  placeAllMines()
  {

  }

  //Calculate what number to put in the tile.
  placeNumber()
  {

  }

  //Loop calls placeNumber to fill in all required tiles with numbers.
  placeAllNumbers()
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

>>>>>>> 63d635ea3c9f4760662e13d75fa27b124b36f3d6
}
