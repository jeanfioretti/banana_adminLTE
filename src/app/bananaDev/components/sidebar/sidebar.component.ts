import { Component, OnInit } from '@angular/core';
import { HttpObserve } from '@angular/common/http/src/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/app/users-list', title: 'Users',  icon:'person', class: '' },
    { path: '/app/rol-list', title: 'Roles',  icon:'donut_large', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/app/third-parties', title: 'Tercero',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [
      { path: '/app/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' }];

  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {

    this.getMenuItems();
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getMenuItems(): void {
    let body: any = {};
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };

    console.log('menu op', options)
    this.http.get('http://localhost:8000/api/access/user/tables', options).toPromise().then(
            result => {

                console.log(result);
                body = result;
                for (let i = 0; i < body.tables.length; i++) {
                    const element = body.tables[i];
                    
                    const item = {
                        path: (body.tables[i].client_angular_path != null || body.tables[i].client_angular_path != undefined ) ? 
                        body.tables[i].client_angular_path :'/app/dashboard',
                        title: body.tables[i].description,
                        icon: (body.tables[i].angular_icon != null || body.tables[i].angular_icon != undefined ) ? 
                        body.tables[i].angular_icon :'error',
                        class: ''
                    }
                    this.menuItems.push(item);
                }
    
            },
            msg => {
              this.showNotification(msg.error, 3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
          }
      );
  }

  showNotification(mess, typeMess){
    const type = ['','info','success','warning','danger'];

    $.notify({
        icon: 'notifications',
        message: mess

    },{
        type: type[typeMess],
        timer: 4000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}
