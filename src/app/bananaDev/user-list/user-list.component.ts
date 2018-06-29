import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpObserve } from '@angular/common/http/src/client';
import { AuthBanana } from '../utils/auth';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public titleTable: string;
  public body: any ;
  public users: any = [];
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.titleTable = 'Usuarios';
    this.getUsers();
  }

  getUsers(): void {
    const observe: HttpObserve = 'response';
    const headers = new HttpHeaders().set('Authorization', window.location.origin);
    const options =  {
            headers: headers,
            // observe: observe
        };
    this.http.get('http://localhost:8000/api/users',options).toPromise().then(
            result => {
                    //  console.log('result.status', result);
                    this.body = result;
                    this.users = this.body.users;
            },
            msg => {
              this.showNotification(msg.error, 3);
              console.log(msg);
              console.error(`Error: ${msg.status} ${msg.statusText}`);
          }
      );


  }

  goToEdit(email){
    // console.log('email', email)
    this.showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['users-profile/' + email])
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
