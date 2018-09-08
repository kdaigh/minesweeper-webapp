import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';

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
    console.log(this.boardWidth);
    console.log(this.boardHeight);
    console.log(this.mines);
    this.createBoard();
  }

  createBoard()
  {
    console.log("createBoard() called");
    this.timerCount = 0; //Reset timer count
    if (this.mines != 0) //Not page startup
    {
      this.flagCount = this.mines;
      if (this.timerID == undefined) //If timer has not been subscribed
      {
        this.st.newTimer('Timer', 1);
        this.subscribeTimer();
      }
    }
  }

  subscribeTimer()
  {
    if (this.timerID != undefined)
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
}
