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
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { ComponentsModule } from '../../components/components.module';
// import {Select2Component} from 'angular-select2-component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    ThirdPartiesComponent,
    ThirdPartiesCrudComponent,
    ThirdPartiesListComponent,
    // Select2Component,
    //LocalizationComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    //ContactComponent,
    //ContactListComponent
    ]
})
export class ThirdPartiesModule { }
