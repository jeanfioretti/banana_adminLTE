import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdPartiesListComponent } from './modules/third-parties/third-parties-list/third-parties-list.component';
import { ThirdPartiesCrudComponent } from './modules/third-parties/third-parties-crud/third-parties-crud.component';

const routes: Routes = [
  { path: 'app/third-parties',     component: ThirdPartiesListComponent },
  { path: 'app/third-parties/new',   component: ThirdPartiesCrudComponent },
  { path: 'app/third-parties/edit/:id',   component: ThirdPartiesCrudComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BananaRoutingModule { }
