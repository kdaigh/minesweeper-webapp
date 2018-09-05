REQUIREMENTS
https://wiki.ittc.ku.edu/ittc_wiki/index.php/EECS448:Project1

1. board - 2D array of tile objects
  a. int numFlags
  b. int numMines
  
2. Cells
  a. bool isMine (random)
  b. int adjMines
  c. bool isFlagged
  d. Icons for bombs, blank tiles, flags, and revealed tiles

3. User Input - board size & # of mines
  a. Textboxes for X and Y and # of mines
  b. Will be validated (greater than 2x2)
  c. mock board will be generated based on input
  d. play button next to textboxes will start timer

4. Winning
  a. Play again?
  
5. Losing
  a. Try again?
  b. explosion sound
  c. reveal all bombs
  d. display correctly flagged bombs

6. Clock

PRIMARY ROLES

Seth - 
Blake - 
Austin - 
Bunty - 
McKenna - 


# Minesweeper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
