import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationCrudComponent } from './organization-crud/organization-crud.component';
import { ComponentsModule } from '../../components/components.module';
import { LoadingModule } from '../../../../../node_modules/ngx-loading';
import { FormsModule, ReactiveFormsModule } from '../../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    LoadingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [OrganizationsComponent, OrganizationListComponent, OrganizationCrudComponent]
})
export class OrganizationsModule { }
