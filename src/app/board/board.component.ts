import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

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
    console.log(this.boardWidth);
    console.log(this.boardHeight);
    console.log(this.mines);
    this.createBoard(this.boardWidth, this.boardHeight, this.mines);
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
  */
}
