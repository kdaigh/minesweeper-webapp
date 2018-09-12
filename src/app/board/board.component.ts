import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
<<<<<<< HEAD
import { minefield } from '../models/minefield';
import { tile } from '../models/tile';
=======
import { tile } from '../models/tile';
import { board } from '../models/board'
>>>>>>> 103ee4d2a8dccbc4b367489c4f4de7435a22d922

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
<<<<<<< HEAD

  generate_table() {
    // get the reference for the body
    var body = document.getElementsByName("minefield")[0];
   
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    // creating all cells
    for (var i = 0; i < this.boardHeight; i++) {
      // creates a table row
      var row = document.createElement("tr");
   
      for (var j = 0; j < this.boardWidth; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var obj = document.createElement("tileObj");
        cell.appendChild(obj);
        row.appendChild(cell);
      }
   
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
   
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }

=======
>>>>>>> 103ee4d2a8dccbc4b367489c4f4de7435a22d922
}
