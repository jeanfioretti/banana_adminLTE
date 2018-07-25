import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationCrudComponent } from './organization-crud/organization-crud.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [OrganizationsComponent, OrganizationListComponent, OrganizationCrudComponent]
})
export class OrganizationsModule { }
