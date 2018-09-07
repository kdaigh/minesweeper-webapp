import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
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
  changeLog: string[] = [];

  constructor() { }

  ngOnChanges() {
    this.createMinefield();
  }

  createMinefield() {
    const mineField = new minefield(this.boardHeight, this.boardWidth);
  }
}
