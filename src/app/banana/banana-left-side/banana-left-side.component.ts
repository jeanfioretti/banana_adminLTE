import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BananaConstants } from '../utils/constants';
import { tokenUtil } from '../utils/tokenUtil';
import { notifyManage } from '../utils/notifyUtil';
declare const $: any;
@Component({
  selector: 'app-banana-left-side',
  templateUrl: './banana-left-side.component.html',
  styleUrls: ['./banana-left-side.component.css']
})
export class BananaLeftSideComponent implements OnInit {
  menuItems: any[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' }];

    constructor(public http: HttpClient, public router: Router) { }

    ngOnInit() {

      this.getMenuItems();
      // this.menuItems = ROUTES.filter(menuItem => menuItem);
    }


    getMenuItems(): void {
      let body: any = {};
      const headers = new HttpHeaders().set('Authorization', window.location.origin)
      .append('user_id', sessionStorage.getItem('user_id'))
      .append('token', sessionStorage.getItem('user_token'))
      .append('app', 'bananaCli');
      const options =  {
              headers: headers,
          };

      // console.log('menu op', options)
      this.http.get(BananaConstants.urlServer+'api/access/user/tables', options).toPromise().then(
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
                tokenUtil(this.router);
                // this.loading = false;
                notifyManage(msg);
            }
        );
    }



}
