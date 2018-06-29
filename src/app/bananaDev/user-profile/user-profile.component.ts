import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { AuthBanana } from '../utils/auth';

declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  email: string;
  titleUser = 'Editar Usuario';
  user: any = {};
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.email = this._activeRoute.snapshot.params['email'];
    // console.log(this.email);
    this.getUsers(this.email);
  }

  getUsers(email): void {
    const observe: HttpObserve = 'response';
    const headers = new HttpHeaders().set('Authorization', window.location.origin);
    const options =  {
            headers: headers,
            observe: observe
        };
    this.http.get('http://localhost:8000/api/user/' + email, options).toPromise().then(
            result => {
                     console.log('result.status', result);
                     this.user = result.body[0];
                     console.log(this.user);
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
