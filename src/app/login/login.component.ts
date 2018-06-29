import { Component, OnInit, Inject } from '@angular/core';
import {  Router  } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { notifyManage } from '../banana/utils/notifyUtil';



declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  public loading = false;


  constructor(public http: HttpClient, public router: Router ) { }

  ngOnInit() {
    // $('#loginModal').css('display','block')
    // sessionStorage.clear();
    console.log('llego al controllador', this.user);
  }

  login() {

    console.log(this.user);
    this.getCredential(this.user.email, this.user.password)
  }

  getCredential(userEmail, userPass): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin);
    const body = {
      authorization: window.location.origin,
      app:"BananaCli",
      email : userEmail,
      password: userPass,
    };
    const options =  {
            headers: headers,
            observe: 'response',
            params: body
        };
    this.http.post('http://localhost:8000/api/login', body).toPromise().then(
            result => {
                    console.log('result', result);

                    const Mybody: any = result;

                    this.saveInLocal('isLogged', true);
                    this.saveInLocal('user_id', Mybody.user[0].id);
                    this.saveInLocal('user_rol_id', Mybody.user[0].rol_id);
                    this.saveInLocal('user_email', Mybody.user[0].email);
                    this.saveInLocal('user_token', Mybody.user[0].remember_token);
                    $('.modal-backdrop').fadeOut();
                    $('#loginModal').modal('hide');
                    this.showNotification('Redireccionando.. Bienvenido');
                    this.router.navigate(['app'])
                    this.loading = false;
            },
            msg => {
              this.loading = false;
              notifyManage(msg);

          }
      );


  }

  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    // this.storage.set(key, val);
    sessionStorage.setItem(key, val);
    // this.data[key] = this.storage.get(key);
   }

  getFromLocal(key): void {
    console.log('recieved= key:' + key);
    // this.data[key] = this.storage.get(key);
    // console.log(this.data);
   }

    openLoginModal(){
        this.showLoginForm();
        setTimeout(function(){
            $('#loginModal').modal('show');
        }, 230);

    }
    showLoginForm(){
      $('#loginModal .registerBox').fadeOut('fast',function(){
          $('.loginBox').fadeIn('fast');
          $('.register-footer').fadeOut('fast',function(){
              $('.login-footer').fadeIn('fast');
          });

          $('.modal-title').html('Login with');
      });
       $('.error').removeClass('alert alert-danger').html('');
    }


  showNotification(mess){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: 'notifications',
        message: mess

    },{
        type: type[color],
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
