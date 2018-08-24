import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule
  ],
  // declarations: [LoginComponent]
})
export class LoginModule { }

