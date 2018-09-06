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
  changeLog: string[] = [];

  constructor() { }

  ngOnChanges() {
    console.log(this.boardWidth);
    console.log(this.boardHeight);
    console.log(this.mines);
    this.createBoard;
  }

  createBoard(boardWidth, boardHeight, mines)
  {
     //Create board from user inputs here
  }
}
