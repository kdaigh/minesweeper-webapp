import { Component, OnInit, Input } from '@angular/core';
import { tile } from '../models/tile';
@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() tile: tile;

  
  ngOnInit() {
  }

    isRevealed: boolean;
    isBomb: boolean;
    isFlagged: boolean;
    id: string;
    constructor() {
    }

}
