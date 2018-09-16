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

  createForm(): void {
    this.boardFormGroup = this.formBuilder.group({
      ColumnCount: ['', Validators.compose([Validators.min(2), Validators.max(30), Validators.required, Validators.pattern('^\\d+$')])],
      RowCount: ['', Validators.compose([Validators.min(2), Validators.max(30), Validators.required, Validators.pattern('^\\d+$')])],
      MineCount: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern('^\\d+$')])],
    });
  }

  
  validateForm(): void {
    var numOfRows = this.boardFormGroup.value.RowCount;
    var numOfColumns = this.boardFormGroup.value.ColumnCount;
    var cellCount = numOfRows * numOfColumns;
    var bombCount = this.boardFormGroup.value.MineCount;
    var isValid = this.boardFormGroup.valid && bombCount < cellCount;

    console.log("validateForm() called");
    console.log("Height: " + numOfRows);
    console.log("Width: " + numOfColumns);
    console.log("Cell count: " + cellCount);
    console.log("Bomb count: " + bombCount);
    console.log("Form is valid: " + isValid);

    if (!isValid)
    {
      const isDimensionValid: boolean = numOfRows >= 2 && numOfColumns >= 2 && numOfRows <= 30 && numOfColumns < 30;
      const isBombCountValid: boolean = bombCount >= 1 && bombCount < cellCount;

      if (!isDimensionValid && !isBombCountValid)
      {
        alert('Board dimensions must be at least 2x2 and less than 30x30.\nBomb count must be less than total number of cells and at least 1.');
      }
      else if (!isDimensionValid)
      {
        alert('Board dimensions must be at least 2x2 and less than 30x30.');
      }
      else if (!isBombCountValid)
      {
        alert('Bomb count must be less than total number of cells and at least 1.');
      }
    }
    else
    {
      this.newBoard();
    }
  }

  newBoard() {
    console.log("newBoard() called");
    this.columnCount = this.boardFormGroup.value.ColumnCount;
    this.rowCount = this.boardFormGroup.value.RowCount;
    this.mineCount= this.boardFormGroup.value.MineCount;
    this.showBoard = true;
    this.num = this.num + 1;
    console.log(this.num);
  }
}
