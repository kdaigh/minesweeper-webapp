import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { UserInputComponent } from '../user-input/user-input.component';


const routes: Routes =
  [
    {
      path: '',
      component: UserInputComponent
    },
    {
      path: 'board',
      component: BoardComponent
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [BoardComponent]
})
export class BoardModule { }
