import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpObserve } from '@angular/common/http/src/client';
import { Type } from '@angular/compiler/src/core';
import { AuthBanana } from '../utils/auth';

declare var $: any;
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  id: string;
  titleRol : string;
  typeView :number;
  rol: any = {};
  permissions: any[];
  body: any;
  selectedPermission: any[] = [];

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
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/rol/' + id, options).toPromise().then(
            result => {
                     this.body = result;
                     this.rol = this.body.rol[0];
                     this.permissions = this.body.permissions;
                     this.permissSelect();
            },
            msg => {
              this.showNotification(msg.error, 3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
          }
      );
  }
  getPermissionAvaiable(type,id): void {
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
    this.http.get('http://localhost:8000/api/rols/getPermission', options).toPromise().then(
            result => {
                    //  console.log('result.status', result);
                     this.body = result;
                     this.permissions = this.body.permissions;
                    //  console.log(this.permissions)
                     this.permissSelect();
            },
            msg => {
              this.showNotification(msg.error, 3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
          }
      );
  }
  createRol(): void {
    const body = {
      authorization: window.location.origin,
      user_id: sessionStorage.getItem('user_id'),
      token: sessionStorage.getItem('user_token'),
      app:'bananaCli',
      rol_name: this.rol.rol_name,
      description:this.rol.description,
      all_access_column:this.rol.all_access_column,
      all_access_organization:this.rol.all_access_organization,
      permits_rol :this.selectedPermission
    };
    console.log(body);
    this.http.post('http://localhost:8000/api/rols/create', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.showNotification('guardado con exito', 1);
            },
            msg => {
               this.showNotification(msg.error,3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
          }
      );
  }
  updateRol(): void {
    const body = {
      authorization: window.location.origin,
      user_id: sessionStorage.getItem('user_id'),
      token: sessionStorage.getItem('user_token'),
      app:'bananaCli',
      rol_id : this.id,
      rol_name: this.rol.rol_name,
      description:this.rol.description,
      all_access_column:this.rol.all_access_column,
      all_access_organization:this.rol.all_access_organization,
      permits_rol :this.selectedPermission
    };
    console.log(body);
    this.http.post('http://localhost:8000/api/rols/update', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.showNotification('guardado con exito', 1);
            },
            msg => {

               this.showNotification(msg.error,3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
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
