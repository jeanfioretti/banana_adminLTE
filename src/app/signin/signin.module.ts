import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';
import { PerInfoComponent } from './per-info/per-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SigninComponent, PerInfoComponent]
})
export class SigninModule { }
