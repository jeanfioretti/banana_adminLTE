import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthBanana } from '../utils/auth';
import { tokenUtil } from '../utils/tokenUtil';
import { notifyManage } from '../utils/notifyUtil';
declare var $: any;
@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit {

  public titleTable: string;
  public body: any ;
  public rols: any = [];
  public keyword:any;
  public loading = false;
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    AuthBanana(this.router)
    this.titleTable = 'Roles';
    this.getRols();
  }

  getRols(): void {
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/rols', options).toPromise().then(
            result => {
                     console.log('result.status', result);
                    // const body = result;
                    this.body = result;
                    this.rols = this.body.rols;
                    this.loading = false;
            },
            msg => {
              tokenUtil(this.router);
              this.loading = false;
              notifyManage(msg);
          }
      );


  }

  archivedRol(id, archived) : void {
    const body :any = {
      rol_id : id,
      archived: archived
    };
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";
    console.log(body);
    this.http.post('http://localhost:8000/api/rols/archived', body).toPromise().then(
      result => {
        console.log('result.status', result);
        this.getRols();
         this.showNotification('archivado con exito', 1);
      },
      msg => {
        tokenUtil(this.router);
        this.loading = false;
        notifyManage(msg);
        }
    );
  }

  goToEdit(id){
    this.showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/rol/edit/' + id])
  }
  goToCreate(){
    this.showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/rol/new'])
  }
  search(){

    // if ((<string>this.keyword).length < 3) {
    //   this.showNotification('Must have 3 charaters', 3);
    //   return
    // }
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
            params: { filter: this.keyword}
        };
    this.http.get('http://localhost:8000/api/rols/filter', options).toPromise().then(
            result => {
                     console.log('result', result);
                     this.body = result;
                     this.rols = this.body.filter_rols;
            },
            msg => {
              tokenUtil(this.router);
              this.loading = false;
              notifyManage(msg);
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
