import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdPartiesListComponent } from './modules/third-parties/third-parties-list/third-parties-list.component';
import { ThirdPartiesCrudComponent } from './modules/third-parties/third-parties-crud/third-parties-crud.component';
import { RolesListComponent } from './modules/roles/roles-list/roles-list.component';
import { RolesCrudComponent } from './modules/roles/roles-crud/roles-crud.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { UsersCrudComponent } from './modules/users/users-crud/users-crud.component';

const routes: Routes = [
  { path: 'app/third-parties',     component: ThirdPartiesListComponent },
  { path: 'app/third-parties/new',   component: ThirdPartiesCrudComponent },
  { path: 'app/third-parties/edit/:id',   component: ThirdPartiesCrudComponent },
  { path: 'app/roles',   component: RolesListComponent },
  { path: 'app/roles/new',   component: RolesCrudComponent },
  { path: 'app/roles/edit/:id',   component: RolesCrudComponent },
  { path: 'app/users',   component: UsersListComponent },
  { path: 'app/users/new',   component: UsersCrudComponent },
  { path: 'app/users/edit/:email',   component: UsersCrudComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BananaRoutingModule { }
