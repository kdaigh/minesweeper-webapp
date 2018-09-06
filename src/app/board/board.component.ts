import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  createBoard(rows, columns, numOfMines)
  {
   //Create board from user inputs here
  }

  ngOnInit() {
  }
}
