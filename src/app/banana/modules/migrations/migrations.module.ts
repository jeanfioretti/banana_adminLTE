import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrationsComponent } from './migrations.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule, FormsModule } from '../../../../../node_modules/@angular/forms';
import { LoadingModule } from '../../../../../node_modules/ngx-loading';
import { HttpClientModule } from '../../../../../node_modules/@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [MigrationsComponent]
})
export class MigrationsModule { }
