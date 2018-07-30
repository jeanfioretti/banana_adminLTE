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
  // contact :Contact[]=[];
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
        this.typeView = 1;

      }
    });
  }

  getUsers(email): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get(BananaConstants.urlServer+'api/user/' + email, options).toPromise().then(
            result => {
                     console.log('result.status', result);
                     const body :any = result;
                     this.user = body[0];
                    //  console.log(this.user);
                    this.user.password = '';
                     this.contact = this.user.contact_id;

                    //  this.contact.push(this.user.contact_id)
                    //  console.log( this.contact)
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
      const headers = new HttpHeaders().set('Authorization', window.location.origin)
      .append('user_id', sessionStorage.getItem('user_id'))
      .append('token', sessionStorage.getItem('user_token'))
      .append('app', 'bananaCli');
      const options =  {
              headers: headers,
          };

      const md5 = new Md5();
      body = this.user;

      this.http.post(BananaConstants.urlServer+'api/users/update', body, options).toPromise().then(
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
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
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
  const headers = new HttpHeaders().set('Authorization', window.location.origin)
  .append('user_id', sessionStorage.getItem('user_id'))
  .append('token', sessionStorage.getItem('user_token'))
  .append('app', 'bananaCli');
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



}
