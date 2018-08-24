import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CustomColumnsComponent } from './custom-columns/custom-columns.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LocalizationComponent } from './localization/localization.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule, FormsModule } from '../../../../node_modules/@angular/forms';
import { LoadingModule } from '../../../../node_modules/ngx-loading';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchComponent } from './branch/branch.component';
import {Select2Component} from 'angular-select2-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
  declarations: [
    ContactComponent,
    ContactListComponent,
    CustomColumnsComponent,
    EditFormComponent,
    LocalizationComponent,
    BranchListComponent,
    BranchComponent,
    Select2Component
  ],
  exports: [
    ContactComponent,
    ContactListComponent,
    CustomColumnsComponent,
    EditFormComponent,
    LocalizationComponent,
    BranchListComponent,
    BranchComponent,
    Select2Component
  ]
})
export class ComponentsModule { }
