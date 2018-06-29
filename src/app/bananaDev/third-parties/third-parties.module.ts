import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';
import { ThirdPartiesComponent } from './third-parties.component';
import { ThirdPartiesCrudComponent } from './third-parties-crud/third-parties-crud.component';
import { ThirdPartiesListComponent } from './third-parties-list/third-parties-list.component';
import { CustomColumnsComponent } from '../custom-columns/custom-columns.component';
import { LocalizationComponent } from '../localization/localization.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
  ],
  declarations: [
    ThirdPartiesComponent, 
    ThirdPartiesCrudComponent, 
    ThirdPartiesListComponent, 
    CustomColumnsComponent,
    LocalizationComponent
    ]
})
export class ThirdPartiesModule { }
