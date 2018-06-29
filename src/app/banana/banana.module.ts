import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BananaRoutingModule } from './banana-routing.module';
import { BananaComponent } from './banana.component';
import { BananaFooterComponent } from './banana-footer/banana-footer.component';
import { BananaHeaderComponent } from './banana-header/banana-header.component';
import { BananaLeftSideComponent } from './banana-left-side/banana-left-side.component';
import { BananaContentComponent } from './banana-content/banana-content.component';
import { BananaControlSidebarComponent } from './banana-control-sidebar/banana-control-sidebar.component';
import { ThirdPartiesModule } from './modules/third-parties/third-parties.module';

@NgModule({
  imports: [
    CommonModule,
    BananaRoutingModule,
    ThirdPartiesModule
  ],
  declarations: [
    BananaComponent,
    BananaFooterComponent,
    BananaHeaderComponent,
    BananaLeftSideComponent,
    BananaContentComponent,
    BananaControlSidebarComponent
  ]
})
export class BananaModule { }
