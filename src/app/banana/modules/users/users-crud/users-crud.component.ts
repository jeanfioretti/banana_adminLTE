import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage } from '../../../utils/notifyUtil';
import { BananaConstants } from '../../../utils/constants';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css']
})
export class UsersCrudComponent implements OnInit {

  email: string;
  titleUser = 'Editar Usuario';
  user: any = {};
  loading = false;
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.email = this._activeRoute.snapshot.params['email'];
    // console.log(this.email);
    this.getUsers(this.email);
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
                     console.log(this.user);
                     this.loading = false;
            },
            msg => {
              tokenUtil(this.router);
              this.loading = false;
              notifyManage(msg);
          }
      );


  }

}
