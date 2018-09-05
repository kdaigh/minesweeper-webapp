import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '',
    component: UserInputComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
