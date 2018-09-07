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
    this.createBoard();
  }

  updateTimer()
  {
    this.timerCount++;
  }

  
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
}
