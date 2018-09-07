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
  }
}
