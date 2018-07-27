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
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router)
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

      const md5 = new Md5();
      // console.log(md5.appendStr(this.user.password).end());

      body = this.user;
      // body.password = md5.appendStr(this.user.password).end()
      body.authorization = window.location.origin;
      body.user_id = sessionStorage.getItem('user_id');
      body.token = sessionStorage.getItem('user_token');
      body.app = "BananaCli";
      console.log(body);
      this.http.post(BananaConstants.urlServer+'api/users/update', body).toPromise().then(
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



}
