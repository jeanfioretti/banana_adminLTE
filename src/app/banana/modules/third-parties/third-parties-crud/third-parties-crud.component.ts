import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchOffice } from '../../../models/branch';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { Third } from '../../../models/third';
import { Localization } from '../../../models/localization';
import { BananaConstants } from '../../../utils/constants';
import { convertDataURIToBinary } from '../../../utils/filesUtils';

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
	branch_offices: any = [];
	full_address : string = '';
	client : any = {};
	combo_select: any = [];
	body: any;
	loading = false;
	imageSrc: string = '';

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
		this.http.get(BananaConstants.urlServer+'api/third/' + id, options).toPromise().then(
			result => {
				this.body = result;
				this.third = this.body.third;
				this.branch_office = this.body.branch_office;
				this.branch_offices = this.body.branch_offices;
				this.localization = this.body.location;
				this.third_contacts = this.body.third_contacts;
				this.getStates(this.localization.country_id);
				this.getCities(this.localization.state_id);
				this.imageSrc = sessionStorage.getItem('clientStorageUrl')+'thirds/'+this.third.logo;
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

	getComboSelect(): void {
		this.loading= true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer+'api/thirds/combo-select', options).toPromise().then(
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
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers
		};
		let body : any;
		body = this.third;
		body.branch_office = this.branch_office;
		body.third_location = this.localization;
		this.http.post(BananaConstants.urlServer+'api/thirds/create', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				showNotification('Redireccionando.. espere', 3);
				this.body = result;
				this.third = this.body.third;
				this.router.navigate(['app/third-parties/edit/' + this.third]);
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
		const headers = new HttpHeaders()
			.set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
		};
		this.loading = true;
		showNotification("Actualizando tercero", 2);
		let body : any;
		body = this.third;
		body.branch_office = this.branch_office;
		body.third_location = this.localization;
		body.storageNameClient = sessionStorage.getItem('clientStorageName');
		body.image = this.imageSrc;
		console.log(body);
		this.http.put(BananaConstants.urlServer+'api/thirds/update', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				this.body = result;
				console.log(this.body);
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
	
	deleteThird () : void {
		this.loading = true;
		showNotification("Eliminando tercero", 2);
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers
		};

		this.http.delete(BananaConstants.urlServer + 'api/thirds/delete/' + this.id + '/' + this.localization.id, options).toPromise()
			.then(
				result => {
					this.loading = false;
					this.body = result;
					if (this.body.third_delete) {
						showNotification('Eliminado con exito', 1);
						this.router.navigate(['app/third-parties/']);
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

	getStates(country_id) {
	this.loading = true;
	const headers = new HttpHeaders().set('Authorization', window.location.origin)
		.append('user_id', sessionStorage.getItem('user_id'))
		.append('token', sessionStorage.getItem('user_token'))
		.append('app', 'bananaCli');
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
	const headers = new HttpHeaders().set('Authorization', window.location.origin)
		.append('user_id', sessionStorage.getItem('user_id'))
		.append('token', sessionStorage.getItem('user_token'))
		.append('app', 'bananaCli');
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
	}
  getEventform(event){
    console.log('controladolr de tercero',event);
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;

    console.log('byteArray',convertDataURIToBinary(this.imageSrc))
    console.log('base64',this.imageSrc);
  }

}
