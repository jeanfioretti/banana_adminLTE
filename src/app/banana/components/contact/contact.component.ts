import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { Contact } from '../../models/contact';
import { BananaConstants } from '../../utils/constants';

declare var $: any;

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
	loading = false;
	@Input() type_view : number;
	@Input() type : number = 0;
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
		//console.log(this.contact);
	}

	ngOnDestroy () {
		//console.log(this.contact);
	}

	getRouteContact (url) : void {

		switch (url) {

			case 'third-parties':
				this.url_create = 'thirds/contact/create';
				this.url_delete = 'thirds/contact/delete/';
			break;
		}
	}

	createContact(): void {

		this.loading = true;
		showNotification("Creando contacto", 2);
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		let body : any = {};
		body.contact = this.contact;
		body.id = this.id;
		this.http.post(BananaConstants.urlServer+'api/' + this.url_create, body, options).toPromise().then(
			result => {
				//console.log('result.status', result);
				this.body = result;
				showNotification('guardado con exito', 1);
				this.contactInsert.emit( this.body.contact );
				this.contact = new Contact();
				this.loading = false;
				this.closeModal();
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

	searchingContact (): void {
		if (this.search.length >= 3) {
		  this.searching = true;
		  this.searchContact();
		} else {
		  this.searching = false;
		  this.contacts_search = [];
		}
	}

	searchContact () {
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
			params: { search: this.search}
		};

		this.http.get(BananaConstants.urlServer+'api/contacts/search', options).toPromise().then(
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

	selectContact (contact) {
		this.contact = contact;
		this.contacts_search = [];
		this.searching = false;
		this.search = '';
	}

	updateContact(): void {

		this.loading = true;
		showNotification("Actualizando contacto", 2);
		let body : any;
		const headers = new HttpHeaders()
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		body = this.contact;
		this.http.put(BananaConstants.urlServer+'api/contacts/update', body, options).toPromise().then(
			result => {
				//console.log('result.status', result);
				showNotification('Actualizado con exito', 1);
				this.loading = false;
				this.closeModal();
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
		const headers = new HttpHeaders()
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		this.http.delete(BananaConstants.urlServer+'api/' + this.url_delete + this.id + '/' + contact.id, options).toPromise().then(
			result => {
				showNotification('Eliminado con exito', 1);
				this.body = result;
				if (this.body.third_contact_removed)
					this.contactDelete.emit( contact );
				else
					showNotification('Error al eliminar', 2);
				this.loading = false;
				this.closeModal();
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

		setTimeout( function(){
			$('#contactModal').modal('show');
		},
		230);
	}

	closeModal () {
		$('#contactModal').modal('hide');
		this.closeModalEdit();
	}

	openContactModalEmpty () {
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
