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
  flagCount;
  timerCount;
  timerID: string;
  public board: board;

  constructor(private st: SimpleTimer)
  {
    
  }

   createBoard()
   {
    this.board = new board();
    
    //Setup new board
     for (var i = 0; i < this.rowCount; i++)
     {
       var row: tile[] = [];

       for (var j = 0; j < this.columnCount; j++)
       {
          row.push(new tile()); //Append new tile to row
       }

       this.board.rows.push(row); //Append new row to board
     }
     this.placeMines();
   }

  ngOnChanges() {
    this.newGame();
  }

  newGame()
  {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.setupTimer();
    this.createBoard();
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
  placeMines()
  {
    var mines_placed = 0;
    while(mines_placed < this.mineCount)
    {
      var mine_row = Math.floor(Math.random() * this.rowCount) + 0;
      var mine_col = Math.floor(Math.random() * this.columnCount) + 0;
      if (this.board.rows[mine_row][mine_col].isBomb == false)
      {
        this.board.rows[mine_row][mine_col].isBomb = true;
        mines_placed++;
      }
    }
   
  }
}
