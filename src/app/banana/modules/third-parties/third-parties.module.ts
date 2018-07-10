import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';
import { ThirdPartiesComponent } from './third-parties.component';
import { ThirdPartiesCrudComponent } from './third-parties-crud/third-parties-crud.component';
import { ThirdPartiesListComponent } from './third-parties-list/third-parties-list.component';
import { LocalizationComponent } from '../../components/localization/localization.component';
import { ContactComponent } from '../../components/contact/contact.component';


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
    LocalizationComponent,
    ContactComponent
    ]
})
export class ThirdPartiesModule { }
