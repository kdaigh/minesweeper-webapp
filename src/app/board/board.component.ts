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

  ngOnChanges() {
    this.newGame();
  }

  /**
   * @pre 
   */
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
  
  //Checks all conditions of the board and calculates if the game is complete.
  isGameOver()
  {

  }
}
