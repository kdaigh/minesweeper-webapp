import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { minefield } from '../models/minefield';
import { tile } from '../models/tile';
import { board } from '../models/board'
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnChanges {
  @Input() columnCount: number;
  @Input() rowCount: number;
  @Input() mineCount: number;
  hasInitializedTable: boolean = false;
  flagCount;
  timerCount;
  timerID: string;
  public board: board = new board();

  constructor(private st: SimpleTimer)
  {
    
  }

   createBoard()
   {
     for (var i = 0; i < this.rowCount; i++)
     {
       var row: tile[] = [];

       for (var j = 0; j < this.columnCount; j++)
       {
          row.push(new tile()); //Append new tile to row
       }

       this.board.rows.push(row); //Append new row to board
     }

    // console.log("newGame() called");
    // var row: tile[] = [];
    // //var tile: any = new tile();
    // row.push(new tile());
    // row.push(new tile());
    // row.push(new tile());

    // console.log("row length: " + row.length);
    // this.board.rows.push(row);
    // this.board.rows.push(row);  
    // this.board.rows.push(row);                     //THROWS ERROR

    //  console.log("Board\n=======");
    //  console.log("Rows: " + this.board.rows.length);
    //  console.log("Columns: " + this.board.rows[0].length);
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
}
