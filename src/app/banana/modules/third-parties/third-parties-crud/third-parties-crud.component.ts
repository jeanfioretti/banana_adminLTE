import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Third } from '../../../models/third';
import { Localization } from '../../../models/localization';
import { BranchOffice } from '../../../models/branch';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage } from '../../../utils/notifyUtil';

declare var $: any;

@Component({
  selector: 'app-third-parties-crud',
  templateUrl: './third-parties-crud.component.html',
  styleUrls: ['./third-parties-crud.component.scss']
})

export class ThirdPartiesCrudComponent implements OnInit {
  id: string;
  title_third : string;
  type_view :number;
  third : Third = new Third();
  localization : Localization = new Localization();
  countries : any = [];
  states : any = [];
  cities : any = [];
  branch_office : BranchOffice = new BranchOffice();
  full_address : string = '';
  client : any = {};
  combo_select: any = [];
  body: any;
  loading = false;

  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    AuthBanana(this.router);
    sessionStorage.setItem('table_id', '1');
    this.id = this._activeRoute.snapshot.params['id'];
    this._activeRoute.url.subscribe(url => {

	    if(url[2].path === 'edit'){

        this.getComboSelect();
	      this.title_third = 'Edit Third';
	      this.type_view = 3;
	      this.getThird(this.id);

	    } else {

        this.getComboSelect();
	      this.title_third = 'Create Third';
	      this.type_view = 1;
	    }
	  });
	}

	getThird(id): void {
    this.loading = true;
    this.showNotification("Obteniendo tercero", 2);
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/third/' + id, options).toPromise().then(
            result => {
                    this.body = result;
                    this.third = this.body.third;
                    this.branch_office = this.body.branch_office;
                    this.localization = this.body.location;
                    this.getStates(this.localization.state_id)
                    this.getCities(this.localization.city_id)
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

  getComboSelect(): void {
    this.loading= true;
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    //console.log(headers);
    this.http.get('http://localhost:8000/api/thirds/combo-select', options).toPromise().then(
            result => {
                    this.body = result;
                    this.combo_select = this.body;
                    this.client = this.combo_select.client;
                    this.loading= false;
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

  createThird(): void {

    this.loading = true;
    this.showNotification("Creando tercero", 2);
    let body : any;
    body = this.third;
    body.branch_office = this.branch_office;
    body.third_location = this.localization;
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    console.log(body);
    this.http.post('http://localhost:8000/api/thirds/create', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.showNotification('guardado con exito', 1);
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

  updateThird(): void {
    this.loading = true;
    this.showNotification("Actualizando tercero", 2);
    let body : any;
    body = this.third;
    body.branch_office = this.branch_office;
    body.third_location = this.localization;
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    console.log(body);
    this.http.post('http://localhost:8000/api/thirds/update', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.showNotification('guardado con exito', 1);
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

  getStates(country_id) {
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/location/states?country_id='+country_id, options).toPromise().then(
            result => {
              this.body = result;
              this.states = this.body.states;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

  getCities(state_id) {
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/location/cities?state_id='+state_id, options).toPromise().then(
            result => {
              this.body = result;
              this.cities = this.body.cities;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
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
