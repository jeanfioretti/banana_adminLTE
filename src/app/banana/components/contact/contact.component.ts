import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { Contact } from '../../models/contact';

declare var $: any;

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	loading = false;
	@Input() type_view : number;
	@Input() contact : Contact = new Contact();
	id : number;
	url_create : string = '';
	url_delete : string = '';
	searching : boolean = false;
	search : string = '';
	contacts_search : Array<any> = [];
	body : any;
	@Output() contactInsert = new EventEmitter<any>();
	@Output() contactDelete = new EventEmitter<any>();
	@Output() cleanContact = new EventEmitter<any>();

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
		this.id = this._activeRoute.snapshot.params['id'];
		this._activeRoute.url.subscribe(url => {
			this.getRouteContact(url[1].path);
		});
	}

	getRouteContact (url) : void {

		switch (url) {

			case 'third-parties':
				this.url_create = 'thirds/contact/create';
				this.url_delete = 'thirds/contact/delete';
			break;
		}
	}

	createContact(): void {

		this.loading = true;
		showNotification("Creando contacto", 2);
		let body : any;
		body = this.contact;
		body.id = this.id;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		//console.log(body);
		this.http.post('http://localhost:8000/api/' + this.url_create, body).toPromise().then(
			result => {
				//console.log('result.status', result);
				this.body = result;
				showNotification('guardado con exito', 1);
				this.contactInsert.emit( this.body.contact );
				this.contact = new Contact();
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

	searchingContact (event: any): void {
		if (event.target.value.length >= 3) {
		  this.searching = true;
		  this.searchContact();
		} else {
		  this.searching = false;
		}
	}

	searchContact () {
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
			params: { search: this.search}
		};

		this.http.get('http://localhost:8000/api/contacts/search', options).toPromise().then(
			result => {
				this.body = result;
				this.contacts_search = this.body.search_contacts;
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

	selectContact (item) {
		console.log(item);
	}

	updateContact(): void {

		this.loading = true;
		showNotification("Actualizando contacto", 2);
		let body : any;
		body = this.contact;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		console.log(body);
		this.http.post('http://localhost:8000/api/contacts/update', body).toPromise().then(
			result => {
				//console.log('result.status', result);
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

	deleteContact (contact) {
		this.loading = true;
		showNotification("Eliminando contacto de tercero", 2);
		let body : any = {};
		body.contact_id = contact.id;
		body.third_id = this.id;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		this.http.post('http://localhost:8000/api/' + this.url_delete, body).toPromise().then(
			result => {
				showNotification('Eliminado con exito', 1);
				this.contactDelete.emit( contact );
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

	openContactModal () {
		this.type_view = 1;
		this.contact = new Contact();

		setTimeout( function(){
			$('#contactModal').modal('show');
		},
		230);
	}

	closeModalEdit () {
		var clean_contact = new Contact();
		this.contacts_search = [];
		this.search = '';
		this.searching = false;
		this.type_view = 3;
		this.cleanContact.emit(clean_contact);
	}
}
