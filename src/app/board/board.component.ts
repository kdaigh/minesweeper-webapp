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
  changeLog: string[] = [];

  constructor() { }

  ngOnChanges() {
    console.log(this.boardWidth);
    console.log(this.boardHeight);
    console.log(this.mines);
    this.createBoard();
  }

  createBoard()
  {
    console.log("createBoard() called")
    if (this.mines == 0) //Initializes binding to empty string on page startup
    {
      this.flagCount = "";
    }
    else //Initializes binding to mines on "New Game"
    {
      this.flagCount = this.mines;
    }
  }
}
