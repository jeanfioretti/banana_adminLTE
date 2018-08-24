import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrationsComponent } from './migrations.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule, FormsModule } from '../../../../../node_modules/@angular/forms';
import { LoadingModule } from '../../../../../node_modules/ngx-loading';
import { HttpClientModule } from '../../../../../node_modules/@angular/common/http';
import { MigrationsListComponent } from './migrations-list/migrations-list.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
    ComponentsModule,
    DataTablesModule
  ],
  declarations: [MigrationsComponent, MigrationsListComponent]
})
export class MigrationsModule { }
