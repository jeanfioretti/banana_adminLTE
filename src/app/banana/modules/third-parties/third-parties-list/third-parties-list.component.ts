import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage } from '../../../utils/notifyUtil';
import { AuthBanana } from '../../../utils/auth';


declare var $: any;

@Component({
  selector: 'app-third-parties-list',
  templateUrl: './third-parties-list.component.html',
  styleUrls: ['./third-parties-list.component.scss']
})
export class ThirdPartiesListComponent implements OnInit {
  public loading = false;
  public titleTable: string;
  public body: any ;
  public thirds: any = [];
  public keyword:any;
  public kanban:false;
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {
    AuthBanana(this.router);
    this.getThirds();
  	this.titleTable = 'Terceros';
  }

  viewKanban(type){
    this.kanban = type;
  }

  getThirds(): void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    //console.log(options);
    this.http.get('http://localhost:8000/api/thirds', options).toPromise().then(
            result => {
                    //console.log('result.status', result);
                    // const body = result;
                    this.loading = false;
                    this.body = result;
                    this.thirds = this.body.thirds;
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

  search() : void {
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
            params: { filter: this.keyword}
        };
    this.http.get('http://localhost:8000/api/thirds/filter', options).toPromise().then(
            result => {
                     //console.log('result', result);
                     this.loading = false;
                     this.body = result;
                     this.thirds = this.body.filter_thirds;
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

  archivedThird(id, archived) : void {
    this.loading = true;
    const body = {
      authorization: window.location.origin,
      user_id: sessionStorage.getItem('user_id'),
      token: sessionStorage.getItem('user_token'),
      app:'bananaCli',
      third_id : id,
      archived: archived
    };
    //console.log(body);
    this.http.post('http://localhost:8000/api/thirds/archived', body).toPromise().then(
      result => {
        this.loading = false;
        console.log('result.status', result);
        this.getThirds();
         this.showNotification('archivado con exito', 1);
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

  goToCreateThird(){
    this.showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/third-parties/new'])
  }

  goToEditThird(id){
    this.showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/third-parties/edit/' + id])
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
