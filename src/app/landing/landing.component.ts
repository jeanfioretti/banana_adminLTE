import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openLoginModal(){
    console.log('LLEGO LOGINMODAL')
    // this.showLoginForm();
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
