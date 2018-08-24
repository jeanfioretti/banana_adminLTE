import { StarterComponent } from '../starter/starter.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BananaComponent } from '../banana/banana.component';
import { LandingComponent } from '../landing/landing.component';
import { SigninComponent } from '../signin/signin.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LandingComponent },
      { path: 'app', component: BananaComponent },
      { path: 'signin', component: SigninComponent },
      {path: '',component: BananaComponent,
        children: [
            {
          path: '',
          loadChildren: '../banana/banana.module#BananaModule'

      }]}
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
