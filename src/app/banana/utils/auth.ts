
export function AuthBanana(_router){

        if(sessionStorage.getItem('isLogged') === undefined || sessionStorage.getItem('isLogged') !== 'true'){

            _router.navigate(['login']);

        }else{
          console.log('esta logeado ' + sessionStorage.getItem('user_email'));

        }
    
}