import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesCrudComponent } from './roles-crud/roles-crud.component';
import { LoadingModule } from 'ngx-loading';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  declarations: [RolesComponent, RolesListComponent, RolesCrudComponent]
})
export class RolesModule { }
