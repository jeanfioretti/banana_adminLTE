import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdPartiesListComponent } from './modules/third-parties/third-parties-list/third-parties-list.component';
import { ThirdPartiesCrudComponent } from './modules/third-parties/third-parties-crud/third-parties-crud.component';
import { RolesListComponent } from './modules/roles/roles-list/roles-list.component';
import { RolesCrudComponent } from './modules/roles/roles-crud/roles-crud.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { UsersCrudComponent } from './modules/users/users-crud/users-crud.component';
import { OrganizationListComponent } from './modules/organizations/organization-list/organization-list.component';
import { OrganizationCrudComponent } from './modules/organizations/organization-crud/organization-crud.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MigrationsComponent } from './modules/migrations/migrations.component';
import { MigrationsListComponent } from './modules/migrations/migrations-list/migrations-list.component';
import {SettingsCountriesComponent} from './modules/settings/settings-countries/settings-countries.component';

const routes: Routes = [
  { path: 'app/dashboard',     component: DashboardComponent },
  { path: 'app/migration',     component: MigrationsListComponent },
  { path: 'app/migration/new',     component: MigrationsComponent },
  { path: 'app/third-parties',     component: ThirdPartiesListComponent },
  { path: 'app/third-parties/new',   component: ThirdPartiesCrudComponent },
  { path: 'app/third-parties/edit/:id',   component: ThirdPartiesCrudComponent },
  { path: 'app/roles',   component: RolesListComponent },
  { path: 'app/roles/new',   component: RolesCrudComponent },
  { path: 'app/roles/edit/:id',   component: RolesCrudComponent },
  { path: 'app/users',   component: UsersListComponent },
  { path: 'app/users/new',   component: UsersCrudComponent },
  { path: 'app/users/edit/:email',   component: UsersCrudComponent },
  { path: 'app/organizations',   component: OrganizationListComponent },
  { path: 'app/organizations/new',   component: OrganizationCrudComponent },
  { path: 'app/organizations/edit/:id',   component: OrganizationCrudComponent },
  { path: 'app/countries',              component:SettingsCountriesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BananaRoutingModule { }
