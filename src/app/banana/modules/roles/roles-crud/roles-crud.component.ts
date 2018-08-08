import { Component, OnInit } from '@angular/core';
import { AuthBanana } from '../../../utils/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { showNotification, notifyManage } from '../../../utils/notifyUtil';
import { tokenUtil } from '../../../utils/tokenUtil';
import { BananaConstants } from '../../../utils/constants';

@Component({
  selector: 'app-roles-crud',
  templateUrl: './roles-crud.component.html',
  styleUrls: ['./roles-crud.component.css']
})
export class RolesCrudComponent implements OnInit {
  id: string;
  titleRol : string;
  typeView :number;
  rol: any = {};
  permissions: any[];
  body: any;
  selectedPermission: any[] = [];
  loading= false;

  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.id = this._activeRoute.snapshot.params['id'];

     this._activeRoute.url.subscribe(url => {

     if(url[2].path === 'edit'){
       this.titleRol = 'Edit Rol';
       this.typeView = 3;
       this.getRol(this.id);
     } else {
      this.titleRol = 'Create Rol';
      this.typeView = 1;
      this.rol.all_access_column = 0;
      this.rol.all_access_organization = 0;
      this.getPermissionAvaiable(2, -1);
     }
    });
  }

  getRol(id): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get(BananaConstants.urlServer+'api/rol/' + id, options).toPromise().then(
            result => {
                     this.body = result;
                     this.rol = this.body.rol[0];
                     this.permissions = this.body.permissions;
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
  getPermissionAvaiable(type,id): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
            params:{
              typeGet:type,
              id:id
            }
        };
    this.http.get(BananaConstants.urlServer+'api/rols/getPermission', options).toPromise().then(
            result => {
                    //  console.log('result.status', result);
                     this.body = result;
                     this.permissions = this.body.permissions;
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
  createRol(): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    let body : any;
    body = this.rol;
    body.permits_rol = this.selectedPermission;
    console.log(body);
    this.http.post(BananaConstants.urlServer+'api/rols/create', body, options).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.loading = false;
                    showNotification('guardado con exito', 1);
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
  updateRol(): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
        headers: headers,
    };
    
    let body : any;
    body = this.rol;
    body.permits_rol = this.selectedPermission;
    console.log(body);
    this.http.put(BananaConstants.urlServer+'api/rols/update', body, options).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.loading = false;
                    showNotification('guardado con exito', 1);
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

  permissSelect() {
    for (let i = 0; i < this.permissions.length; i++) {

      for (let j = 0; j < this.permissions[i].columns.length; j++) {

        if (this.permissions[i].columns[j].selected == 1) {
          this.selectedPermission.push( this.permissions[i].columns[j]);
        }
      }
    }
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

}
