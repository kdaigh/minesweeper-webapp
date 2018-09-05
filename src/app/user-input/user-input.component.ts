import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  boardFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router) {
    this.boardFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.boardFormGroup = this.formBuilder.group({
      boardWidth: ['', Validators.compose([Validators.min(2), Validators.required])],
      boardHeight: ['', Validators.compose([Validators.min(2), Validators.required])],
      totalMines: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern('^\\d+$')])],
    });
  }

  validateForm(): void {
    if (!this.boardFormGroup.valid) {
      alert('Board size must be at least 2x2 with at least 1 mine');
    } else {
      // alert ('succeeded');
      console.log('works');
      const routeSuccess = this.router.navigate(['board']);
      if (routeSuccess) {
        console.log('success');
      }
    }
  }

}
