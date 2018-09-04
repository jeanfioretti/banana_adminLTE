import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { Localization } from '../../../models/localization';
//import { Contact } from '../../../models/contact';
import { BananaConstants } from '../../../utils/constants';
import { Organization } from '../../../models/organization';

declare var $: any;

@Component({
  selector: 'app-organization-crud',
  templateUrl: './organization-crud.component.html',
  styleUrls: ['./organization-crud.component.css']
})
export class OrganizationCrudComponent implements OnInit {
	id : string;
	title_organization : string;
	type_view :number;
	organization : Organization = new Organization();
	localization : Localization = new Localization();
	organization_contacts : any = [];
	full_address : string = '';
	client : any = {};
	combo_select: any = [];
	body: any;
	loading = false;
	
	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
		AuthBanana(this.router);
		sessionStorage.setItem('table_id', '2');
		this.id = this._activeRoute.snapshot.params['id'];

		this._activeRoute.url.subscribe(url => {

			if(url[2].path === 'edit'){

				this.title_organization = 'Edit Organization';
				this.type_view = 3;
				this.getOrganization(this.id);

			} else {

				this.title_organization = 'Create Organization';
				this.type_view = 1;

			}
		});
	}

	getOrganization (id) {
		this.loading = true;
		showNotification("Obteniendo organizacion", 2);
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer + 'api/organization/' + id, options).toPromise().then(
			result => {
				this.body = result;
				this.organization = this.body.organization;
				if ( this.body.localization != null ) this.localization = this.body.localization;
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

	getFullAddress (full_address) {
		this.full_address = full_address;
	}

	cleanData () {
		this.organization = new Organization();
		this.localization = new Localization();
	}

	createOrganization () {
		this.loading = true;
		showNotification("Creando organizacion", 2);
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		let body : any;
		body = this.organization;
		body.organization_location = this.localization;
		this.http.post(BananaConstants.urlServer + 'api/organizations/create', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				this.body = result;
				this.organization = this.body.organization_create;
				this.router.navigate(['app/organizations/']);
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

	updateOrganization () {
		this.loading = true;
		showNotification("Actualizando organizacion", 2);
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		let body : any;
		body = this.organization;
		body.organization_location = this.localization;
		this.http.put(BananaConstants.urlServer + 'api/organizations/update', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				this.body = result;
				this.organization = this.body.organization;
				this.localization = this.body.localization;
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

	deleteOrganization () : void {
		this.loading = true;
		showNotification("Eliminando organizacion", 2);
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};

		this.http.delete(BananaConstants.urlServer + 'api/organizations/delete/' + this.id, options).toPromise()
			.then(
				result => {
					this.loading = false;
					this.body = result;
					if (this.body.organization_delete) {
						showNotification('Eliminado con exito', 1);
						this.router.navigate(['app/organizations/']);
					} else {
						showNotification('Error al eliminar', 2);
					}
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

	/* getStates(country_id) {
		this.loading = true;
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options = {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer +'api/location/states?country_id='+country_id, options).toPromise().then(
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
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options = {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer +'api/location/cities?state_id='+state_id, options).toPromise().then(
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
	} */

}
