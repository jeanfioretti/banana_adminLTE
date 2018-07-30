import { Component, OnInit, Inject } from '@angular/core';
import {  Router  } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { notifyManage, showNotification } from '../banana/utils/notifyUtil';
import { BananaConstants } from '../banana/utils/constants';
import { Md5 } from '../../../node_modules/ts-md5';



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
    const headers = new HttpHeaders().set('authorization', window.location.origin)
      .set('app', 'BananaCli');
     const md5 = new Md5();
    // console.log(md5.appendStr(userPass).end());
    const body = {
      // authorization: window.location.origin,
      // app:"BananaCli",
      email : userEmail,
      password: md5.appendStr(userPass).end(),
    };
    console.log(body);
    const options =  {
            headers: headers
        };
    this.http.post(BananaConstants.urlServer+'api/login', body, options).toPromise().then(
            result => {
                    console.log('result', result);
                    const responseComplete :any = result;
                    const Mybody: any = responseComplete.user;
                    this.saveInLocal('clientStorageUrl', responseComplete.storage);
                    this.saveInLocal('clientStorageName', responseComplete.storageName);
                    this.saveInLocal('isLogged', true);
                    this.saveInLocal('user_id', Mybody.user[0].id);
                    this.saveInLocal('user_rol_id', Mybody.user[0].rol_id);
                    this.saveInLocal('user_email', Mybody.user[0].email);
                    this.saveInLocal('user_token', Mybody.user[0].remember_token);
                    $('.modal-backdrop').fadeOut();
                    $('#loginModal').modal('hide');
                    showNotification('Redireccionando.. Bienvenido',2);
                    this.router.navigate(['app/dashboard'])
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


}


