import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';
import { ThirdPartiesComponent } from './third-parties.component';
import { ThirdPartiesCrudComponent } from './third-parties-crud/third-parties-crud.component';
import { ThirdPartiesListComponent } from './third-parties-list/third-parties-list.component';
import { LocalizationComponent } from '../../components/localization/localization.component';
import { DynamicFormComponent } from '../../form/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../../form/dynamic-form-question.component';
import { ContactComponent } from '../../components/contact/contact.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ThirdPartiesComponent,
    ThirdPartiesCrudComponent,
    ThirdPartiesListComponent,
    LocalizationComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ContactComponent
    ]
})
export class ThirdPartiesModule { }
