import { Component, OnInit } from '@angular/core';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../../utils/constants';
import { AuthBanana } from '../../../utils/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public titleTable: string;
  public body: any ;
  public users: any = [];
  public loading = false;
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    AuthBanana(this.router);
    this.titleTable = 'Usuarios';
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get(BananaConstants.urlServer+'api/users',options).toPromise().then(
            result => {
                    //  console.log('result.status', result);
                    this.body = result;
                    this.users = this.body.users;
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

  goToEdit(email){
    // console.log('email', email)
    showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/users/edit/' + email]);
  }
  goToCreate(){
    showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/users/new/']);
  }
}
