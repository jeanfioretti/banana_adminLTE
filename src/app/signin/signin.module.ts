import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SigninComponent]
})
export class SigninModule { }
