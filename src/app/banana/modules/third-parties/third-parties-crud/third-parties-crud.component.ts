import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBanana } from '../../../utils/auth';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { Third } from '../../../models/third';
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
	organizations : Array<any> = [];
	countries : any = [];
	states : any = [];
	cities : any = [];
	third_contacts : any = [];
	branch_offices: any = [];
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
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		this.http.get(BananaConstants.urlServer+'api/third/' + id, options).toPromise().then(
			result => {
				this.body = result;
				this.third = this.body.third;
				this.organizations = this.body.organizations;
				this.branch_offices = this.body.branch_offices;
				this.third_contacts = this.body.third_contacts;
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

	getComboSelect(): void {
		this.loading= true;
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
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

	cleanData () {
		this.third = new Third();
		this.organizations = [];
	}

	compareOrganizations (id) : boolean {
		let find = false;
		this.organizations.map( function(organization) {
			if ( organization.id == id ) {
				find = true;
				console.log(organization.id);
				return;
			}
		});
		return find;
	}

	selected(option) {
		console.log( option );
	}

	createThird(): void {
		this.loading = true;
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		let body : any;
		body = this.third;
		body.organizations = this.organizations;
		//console.log(body);
		this.http.post(BananaConstants.urlServer+'api/thirds/create', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				this.body = result;
				this.third = this.body.third;
				this.id = this.body.third.id;
				this.organizations = this.body.organizations;
				this.branch_offices = this.body.branch_offices;
				this.third_contacts = this.body.third_contacts;
				this.imageSrc = sessionStorage.getItem('clientStorageUrl')+'thirds/'+this.third.logo;
				//this.third = this.body.third;
				//this.router.navigate(['app/third-parties/']);
				this.type_view = 3;
				window.history.pushState(null, '', 'app/third-parties/edit/'+this.id);
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
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		this.loading = true;
		let body : any;
		body = this.third;
		body.organizations = this.organizations;
		//body.storageNameClient = sessionStorage.getItem('clientStorageName');
		//body.image = this.imageSrc;
		//console.log(body);
		this.http.put(BananaConstants.urlServer+'api/thirds/update', body, options).toPromise().then(
			result => {
				showNotification('guardado con exito', 1);
				this.body = result;
				//console.log(this.body);
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
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};

		this.http.delete(BananaConstants.urlServer + 'api/thirds/delete/' + this.id, options).toPromise()
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
