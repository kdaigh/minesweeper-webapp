import { Component, OnChanges, Input } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { minefield } from '../models/minefield';
import { tile } from '../models/tile';
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
  hasInitializedTable: boolean = false;;
  flagCount;
  timerCount;
  timerID: string;
  board;

  constructor(private st: SimpleTimer)
  {
    
  }

   createMinefield()
   {
     this.board = [];
     for(var i: number = 0; i < 10; i++) {
       this.board[i] = new tile();
     }
   }

  ngOnChanges() {
    this.newGame();
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
    for (var i = 0; i < this.rowCount; i++)
    {
      //Create row
      var row = document.createElement("tr");
   
      for (var j = 0; j < this.columnCount; j++)
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

  newGame()
  {
    this.flagCount = this.mineCount; //Initialize flagCount
    this.setupTimer();
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
