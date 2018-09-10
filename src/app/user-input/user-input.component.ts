import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  boardFormGroup: FormGroup;
  boardWidth: number = 0;
  boardHeight: number = 0;
  mines: number = 0;
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
      BoardWidth: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      BoardHeight: ['', Validators.compose([Validators.min(2), Validators.required, Validators.pattern('^\\d+$')])],
      TotalMines: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern('^\\d+$')])],
    });
    //Validators.max(this.boardFormGroup.value.BoardWidth * this.boardFormGroup.value.BoardHeight),
    // ^ Doesn't work
  }

  validateForm(): void {
    var height = this.boardFormGroup.value.BoardHeight;
    var width = this.boardFormGroup.value.BoardWidth;
    var cellCount = height * width;
    var bombCount = this.boardFormGroup.value.TotalMines;
    var isValid = this.boardFormGroup.valid && bombCount < cellCount;

    console.log("validateForm() called");
    console.log("Height: " + height);
    console.log("Width: " + width);
    console.log("Cell count: " + cellCount);
    console.log("Bomb count: " + bombCount);
    console.log("Form is valid: " + isValid);

    if (!isValid)
    {
      const isDimensionValid: boolean = height >= 2 && width >= 2;
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
    }
    else
    {
      this.newBoard();
    }
  }

  newBoard() {
    console.log("newBoard() called");
    this.boardWidth = this.boardFormGroup.value.BoardWidth;
    this.boardHeight = this.boardFormGroup.value.BoardHeight;
    this.mines= this.boardFormGroup.value.TotalMines;
    this.showBoard = true;
    this.num = this.num + 1;
  }
}
