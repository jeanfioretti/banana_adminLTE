import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { BranchOffice } from '../../models/branch';
import { BananaConstants } from '../../utils/constants';
import { Localization } from '../../models/localization';
declare var $: any;

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
	loading = false;
	@Input() type_view : number;
	// @Input() type : number = 0;
	@Input() branch : BranchOffice = new BranchOffice();
	@Input() localization : Localization = new Localization();
	id : number;
	body : any;
	countries : any = [];
	states : any = [];
	cities : any = [];
	//full_address : string = '';
	@Output() branchInsert = new EventEmitter<any>();
	@Output() branchDelete = new EventEmitter<any>();
	@Output() cleanBranch = new EventEmitter<any>();

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
		this.id = this._activeRoute.snapshot.params['id'];
		/* this._activeRoute.url.subscribe(url => {
			
		}); */
	}

	/* getFullAddress (full_address) {
		this.full_address = full_address;
	} */

	createBranchOffice(): void {

		this.loading = true;
		showNotification("Creando sucursal", 2);
		let body : any;
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		body = this.branch;
		body.id = this.id;
		body.branch_location = this.localization;
		this.http.post(BananaConstants.urlServer+'api/' + 'thirds/branch/create', body, options).toPromise().then(
			result => {
				this.body = result;
				showNotification('guardado con exito', 1);
				this.body.localization = this.localization
				this.branchInsert.emit( this.body );
				this.branch = new BranchOffice();
				this.localization = new Localization();
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

	updateBranchOffice(): void {
		this.loading = true;
		showNotification("Actualizando sucursal", 2);
		let body : any;
		const headers = new HttpHeaders()
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		body = this.branch;
		body.branch_location = this.localization;
		this.http.put(BananaConstants.urlServer + 'api/thirds/branch/update', body, options).toPromise().then(
			result => {
				this.body = result;
				//console.log(this.body);
				showNotification('Actualizado con exito', 1);
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

	deleteBranch (branch) {
		this.loading = true;
		showNotification("Eliminando sucursal", 2);
		const headers = new HttpHeaders()
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		this.http.delete(BananaConstants.urlServer+'api/thirds/branch/delete/' + branch.id, options).toPromise().then(
			result => {
				showNotification('Eliminado con exito', 1);
				this.body = result;
				if (this.body.branch_removed)
					this.branchDelete.emit( branch );
				else
					showNotification('Error al eliminar', 2);
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
	}

	openBranchModal () {

		setTimeout( function(){
			$('#branchModal').modal('show');
		},
		230);
	}

	openBranchModalEmpty () {
		this.type_view = 1;
		this.branch = new BranchOffice();
		this.localization = new Localization();

		setTimeout( function(){
			$('#branchModal').modal('show');
		},
		230);
	}

	closeModalEdit () {
		var clean_branch = new BranchOffice();
		this.type_view = 3;
		this.cleanBranch.emit(clean_branch);
	}

}
