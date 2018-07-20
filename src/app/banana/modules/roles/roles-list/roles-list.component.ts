import { Component, OnInit } from '@angular/core';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { AuthBanana } from '../../../utils/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BananaConstants } from '../../../utils/constants';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
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
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get(BananaConstants.urlServer+'api/rols', options).toPromise().then(
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
    this.loading = true;
    const body :any = {
      rol_id : id,
      archived: archived
    };
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";
    console.log(body);
    this.http.post(BananaConstants.urlServer+'api/rols/archived', body).toPromise().then(
      result => {
        console.log('result.status', result);
        this.getRols();
         showNotification('archivado con exito', 1);
         this.loading = false;
      },
      msg => {
        tokenUtil(this.router);
        this.loading = false;
        notifyManage(msg);
        }
    );
  }

  goToEdit(id){
    this.loading = true;
    showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/roles/edit/' + id])
  }
  goToCreate(){
    this.loading = true;
    showNotification('Redireccionando.. espere', 3);
    this.router.navigate(['app/roles/new'])
  }
  search(){

    // if ((<string>this.keyword).length < 3) {
    //   this.showNotification('Must have 3 charaters', 3);
    //   return
    // }
    this.loading = true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
            params: { filter: this.keyword}
        };
    this.http.get(BananaConstants.urlServer+'api/rols/filter', options).toPromise().then(
            result => {
                     console.log('result', result);
                     this.body = result;
                     this.rols = this.body.filter_rols;
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
