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
	url_contact : string = '';
	body : any;
	@Output() contactInsert = new EventEmitter<any>();
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
				this.url_contact = 'thirds/contact/create';
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
		this.http.post('http://localhost:8000/api/' + this.url_contact, body).toPromise().then(
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
		this.type_view = 3;
		this.cleanContact.emit(clean_contact);
	}
}
