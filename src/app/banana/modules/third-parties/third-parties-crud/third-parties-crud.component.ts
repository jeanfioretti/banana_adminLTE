import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchOffice } from '../../../models/branch';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { Third } from '../../../models/third';
import { Localization } from '../../../models/localization';

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
	third_contacts : any = [];
	full_address : string = '';
	client : any = {};
	combo_select: any = [];
	body: any;
	loading = false;

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
		AuthBanana(this.router);
		sessionStorage.setItem('table_id', '17');
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
		showNotification("Obteniendo tercero", 2);
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
				this.third_contacts = this.body.third_contacts;
				this.getStates(this.localization.country_id);
				this.getCities(this.localization.state_id);
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
		showNotification("Creando tercero", 2);
		let body : any;
		body = this.third;
		body.branch_office = this.branch_office;
		body.third_location = this.localization;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";
		//console.log(body);
		this.http.post('http://localhost:8000/api/thirds/create', body).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				showNotification('Redireccionando.. espere', 3);
				this.body = result;
				this.third = this.body.third;
				this.router.navigate(['app/third-parties/edit/' + this.third.id]);
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
		showNotification("Actualizando tercero", 2);
		let body : any;
		body = this.third;
		body.branch_office = this.branch_office;
		body.third_location = this.localization;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";
		//console.log(body);
		this.http.post('http://localhost:8000/api/thirds/update', body).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
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
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options = {
			headers: headers,
		};
		this.http.get('http://localhost:8000/api/location/states?country_id='+country_id, options).toPromise().then(
			result => {
				this.loading = false;
				this.body = result;
				this.states = this.body.states;
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

	getCities(state_id) {
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options = {
			headers: headers,
		};
		this.http.get('http://localhost:8000/api/location/cities?state_id='+state_id, options).toPromise().then(
			result => {
				this.loading = false;
				this.body = result;
				this.cities = this.body.cities;
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

	getContactInsert (contact) {
		this.third_contacts.splice(0, 0, contact);
		console.log(this.third_contacts);
  }
  getEventform(event){
    console.log(event);
  }

}
