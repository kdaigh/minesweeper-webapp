import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  boardFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.boardFormGroup = this.formBuilder.group({});
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
  }

  

  validateForm(): void {
    if (!this.boardFormGroup.valid)
    {
      var height = this.boardFormGroup.value.BoardHeight;
      var width = this.boardFormGroup.value.BoardWidth;
      var cellCount = height * width;
      var bombCount = this.boardFormGroup.value.TotalMines;

      const isDimensionValid: boolean = height >= 2 && width >= 2;
      const isBombCountValid: boolean = bombCount >= 1 && bombCount < cellCount;

      if (!isDimensionValid && !isBombCountValid)
      {
        alert('Board dimensions must be at least 2x2.\nBomb count less than total number of cells and at least 1.');
      }
      else if (!isDimensionValid)
      {
        alert('Board dimensions must be at least 2x2.');
      }
      else if (!isBombCountValid)
      {
        alert('Bomb count less than total number of cells and at least 1.');
      }
    }
    else
    {
      this.newBoard();
    }
  }

  boardWidth: number = 0;
  boardHeight: number = 0;
  mines: number = 0;
  newBoard() {
    this.boardWidth = this.boardFormGroup.value.BoardWidth;
    this.boardHeight = this.boardFormGroup.value.BoardHeight;
    this.mines= this.boardFormGroup.value.TotalMines;
  }
}
