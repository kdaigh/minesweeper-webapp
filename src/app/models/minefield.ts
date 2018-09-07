import { tile } from './tile';

export class minefield {
    constructor(numRows: number, numCols) {
        const tiles = [];
        for (var i = 0; i < numRows; i++) {
            tiles[i] = [];
            for (var j = 0; i < numCols; j++) {
                var id: string = i+'x'+j;
                tiles[i][j] = new tile(false, false, false, id);
            }
        }
    }
}