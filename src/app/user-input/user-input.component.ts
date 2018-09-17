import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  boardFormGroup: FormGroup;
  columnCount: number = 0;
  rowCount: number = 0;
  mineCount: number = 0;
  showBoard: boolean;
  num: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.boardFormGroup = this.formBuilder.group({});
    this.showBoard = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

   /**
   * Creates validators for the inputs that need to be checked.
   * 
   * @pre none.
   * 
   * @post ColumnCount, RowCount, and MineCount validators are set.
   */
  createForm(): void {
    this.boardFormGroup = this.formBuilder.group({
      ColumnCount: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      RowCount: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      MineCount: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern('^\\d+$')])],
    });
  }

   /**
   * Validates user inputs and provides dialog feedback when the user does not pass correct input. 
   * Calls new board when input has been validated.
   * 
   * @pre User has provided input.
   * 
   * @post newBoard is called after valid input.
   */
  validateForm(): void {
    var numOfRows = this.boardFormGroup.value.RowCount;
    var numOfColumns = this.boardFormGroup.value.ColumnCount;
    var cellCount = numOfRows * numOfColumns;
    var bombCount = this.boardFormGroup.value.MineCount;
    var isValid = this.boardFormGroup.valid && bombCount < cellCount;

    if (!isValid)
    {
      const isDimensionValid: boolean = numOfRows >= 2 && numOfColumns >= 2 && numOfRows <=30 && numOfColumns <= 30;
      const isBombCountValid: boolean = bombCount >= 1 && bombCount < cellCount;

      if (!isDimensionValid && !isBombCountValid)
      {
        alert('Board dimensions must be at least 2x2.\nBomb count must be less than total number of cells and at least 1.');
      }
      else if (!isDimensionValid)
      {
        alert('Board dimensions must be at least 2x2.');
      }
      else if (!isBombCountValid)
      {
        alert('Bomb count must be less than total number of cells and at least 1.');
      }
      else if (cellCount > 2499)
      {
        alert('Cell count cannot exceed 2500');
      }
    }
    else
    {
      this.newBoard();
    }
  }

   /**
   * Transfers all user inputs to the board.
   * 
   * @pre Inputs have been validated.
   * 
   * @post board now has correct column, row, and mine count.
   */
  newBoard() {
    this.columnCount = this.boardFormGroup.value.ColumnCount;
    this.rowCount = this.boardFormGroup.value.RowCount;
    this.mineCount= this.boardFormGroup.value.MineCount;
    this.showBoard = true;
    this.num = this.num + 1;
  }
}
