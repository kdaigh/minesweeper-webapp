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
  timerID: string;
  public board: board;

  constructor(private st: SimpleTimer)
  {
    
  }

  ngOnChanges() {
    this.newGame();
  }

  newGame()
  {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.setupTimer();
    this.board = new board(this.rowCount, this.columnCount, this.mineCount);
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
  }
  
  //Checks all conditions of the board and calculates if the game is complete.
  isGameOver()
  {

  }
}
