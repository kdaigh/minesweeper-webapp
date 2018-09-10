import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
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
  @Input() num: number;
  hasInitializedTable: boolean = false;
  flagCount;
  timerCount;
  timerID: string;

  constructor(private st: SimpleTimer) {
   }

  ngOnChanges() {
    this.generateTable();
    this.createBoard();
  }

  generateTable()
  {
    var div = document.getElementsByName("minefield")[0];

    //Deletes old table if one has been created
    if (this.hasInitializedTable)
    {
      div.removeChild(div.children[1]);
    }
   
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");
   
    //Create table body
    for (var i = 0; i < this.boardHeight; i++)
    {
      //Create row
      var row = document.createElement("tr");
   
      for (var j = 0; j < this.boardWidth; j++)
      {
        //Create cell
        var cell = document.createElement("td");
        var cellText = document.createTextNode("Row: " + i + ", column: " + j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      //Append row
      tableBody.appendChild(row);
    }
   
    //Append tableBody
    table.appendChild(tableBody);

    //Append table
    div.appendChild(table);
    this.hasInitializedTable = true;

    //Set table attributes
    table.setAttribute("border", "2");
  }

  createBoard()
  {
    console.log("createBoard() called");
    this.timerCount = 0; //Reset timer count
    if (this.mines != 0) //Not page startup
    {
      const mineField = new minefield(this.boardHeight, this.boardWidth);
      this.placeAllMines(minefield);
      this.placeAllNumbers(minefield);
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
    if (this.mines == 0) //Page startup
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

  //returns the current tile you are on.
  getTile()
  {
    return;
  }

  //Places a random mine on the board
  placeMine(ninefield)
  {

  }

  //Loop calls place mine to populate the board with random mines
  placeAllMines(minefield)
  {

  }

  //Calculate what number to put in the tile.
  placeNumber(minefield, row, col)
  {

  }

  //Loop calls placeNumber to fill in all required tiles with numbers.
  placeAllNumbers(minefield)
  {

  }
  
  //Checks all conditions of the board and calculates if the game is complete.
  isGameOver()
  {

  }

  //Function that creates board and operates the functions.
  boardComtroller($scope)
  {

  }

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
        var cellText = document.createElement("img");
        cellText.src = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/covered.png";
        row.appendChild(cell);
        cell.appendChild(cellText);
  
        
      }
   
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
   
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
  }
  public myFunc(obj):MouseEvent {
    obj.src = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/empty.png";
    return;
  }


}
