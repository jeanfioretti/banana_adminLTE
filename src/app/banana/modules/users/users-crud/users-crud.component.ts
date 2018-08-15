import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { BananaConstants } from '../../../utils/constants';
import { Contact } from '../../../models/contact';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css']
})
export class UsersCrudComponent implements OnInit {

  email: string;
  titleUser = 'Editar Usuario';
  user: any = {};
  typeView:number;
  permissions: any[];
  selectedPermission: any[] = [];
  contact: Contact = new Contact();
  ConfirmPassword:string;
  loading = false;
  combo_select :any[];
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.getElements();
    this._activeRoute.url.subscribe(url => {

      if(url[2].path === 'edit'){

        this.titleUser = 'Edit User';
        this.typeView = 3;
        this.email = this._activeRoute.snapshot.params['email'];
        this.getUsers(this.email);

      } else {

        this.titleUser = 'Create User';
        this.user.id = -1;
        this.typeView = 1;

      }
    });
  }

  getUsers(email): void {
    this.loading = true;
    const headers = new HttpHeaders().set('authorization', window.location.origin)
    .append('user', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'BananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get(BananaConstants.urlServer+'api/user/' + email, options).toPromise().then(
            result => {
                     console.log('result.status', result);
                     const body :any = result;
                     this.user = body[0];
                     this.user.password = '';
                     this.contact = this.user.contact_id;
                     this.getPermits(2,this.user.id);
                     this.loading = false;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loading = false;
              notifyManage(msg);
          }
      );


  }

  updateUser(): void {
      this.loading = true;
      showNotification("Actualizando tercero", 2);
      let body : any;
      const headers = new HttpHeaders().set('authorization', window.location.origin)
      .append('user', sessionStorage.getItem('user_id'))
      .append('token', sessionStorage.getItem('user_token'))
      .append('app', 'BananaCli');
      const options =  {
              headers: headers,
          };

      const md5 = new Md5();
      body = this.user;

      this.http.put(BananaConstants.urlServer+'api/users/update', body, options).toPromise().then(
        result => {
          showNotification('guardado con exito', 1);
          this.loading = false;
        },
        msg => {
          if (msg.status == 406) {
            tokenUtil(this.router);
          }
          this.loading = false;
          notifyManage(msg);

        }
      );
  }

  createUser(): void {
    this.loading = true;
    showNotification('Actualizando tercero', 2);
    let body : any;
    const headers = new HttpHeaders().set('authorization', window.location.origin)
    .append('user', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'BananaCli');
    const options =  {
            headers: headers,
        };

    body = this.user;

    this.http.post(BananaConstants.urlServer+'api/users/create', body, options).toPromise().then(
      result => {
        showNotification('guardado con exito', 1);
        this.loading = false;
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
        this.loading = false;
        notifyManage(msg);

      }
    );
}

getElements(): void {
  this.loading = true;
  const headers = new HttpHeaders().set('authorization', window.location.origin)
  .append('user', sessionStorage.getItem('user_id'))
  .append('token', sessionStorage.getItem('user_token'))
  .append('app', 'BananaCli');
  const options =  {
          headers: headers,
      };
  this.http.get(BananaConstants.urlServer+'api/users/elements', options).toPromise().then(
          result => {
                   console.log('result.status', result);
                   const body :any = result;
                   this.combo_select = body.elements;
                  console.log(this.combo_select)
                   this.loading = false;
          },
          msg => {
            if (msg.status == 406) {
              tokenUtil(this.router);
            }
            this.loading = false;
            notifyManage(msg);
        }
    );


}

getPermits(type,id): void {
  this.loading = true;

  const headers = new HttpHeaders().set('authorization', window.location.origin)
  .append('user', sessionStorage.getItem('user_id'))
  .append('token', sessionStorage.getItem('user_token'))
  .append('app', 'BananaCli');
  const options =  {
          headers: headers,
          params:{
            id:id,
            type:type
          }
      };
  this.http.get(BananaConstants.urlServer+'api/users/getPermits', options).toPromise().then(
          result => {
                //  console.log('result.status', result);
                const body:any = result;
                this.permissions = body.permissions;
                //  console.log(this.permissions)
                this.permissSelect();
                this.loading = false;
          },
          msg => {
            if (msg.status == 406) {
              tokenUtil(this.router);
            }
            this.loading = false;
            notifyManage(msg);
        }
    );


}
selectColumn(columnsPer, event, action){
  let exist = false;
  switch (action) {
    case 'create':
      columnsPer.create = (event) ? 1 : 0;
    break;
    case 'update':
      columnsPer.update = (event) ? 1 : 0;
    break;
    case 'read':
      columnsPer.read = (event) ? 1 : 0;
    break;
    case 'delete':
      columnsPer.delete = (event) ? 1 : 0;
    break;
  }

  for (let i = 0; i < this.selectedPermission.length; i++) {

    if (this.selectedPermission[i].column_id == columnsPer.column_id){
      this.selectedPermission[i] = columnsPer;
      exist = true;
      break;
    }

  }
  if (!exist) {
    this.selectedPermission.push( columnsPer );
  }

}

permissSelect() {
  for (let i = 0; i < this.permissions.length; i++) {

    for (let j = 0; j < this.permissions[i].columns.length; j++) {

      if (this.permissions[i].columns[j].selected == 1) {
        this.selectedPermission.push( this.permissions[i].columns[j]);
      }
    }
  }
}




}
