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
	title_contact : string;
	@Input() type_view : number;
	@Input() contact : Contact = new Contact();
	id : number;
	url_contact : string = '';
	body : any;
	@Output() contactInsert = new EventEmitter<any>();

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {

		this.id = this._activeRoute.snapshot.params['id'];

		this._activeRoute.url.subscribe(url => {

			this.getRouteContact(url[1].path);

			/*if(url[2].path === 'edit'){

				this.title_contact = 'Edit third contact';
				this.type_view = 3;
				this.getContact(this.contact.id);

			} else {

				this.title_contact = 'Create third contact';
				this.type_view = 1;

			}*/
		});

	}

	/*getContact(id): void {
		this.loading = true;
		showNotification("Obteniendo contacto", 2);
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get('http://localhost:8000/api/contact/' + id, options).toPromise().then(
			result => {
				this.body = result;
				this.contact = this.body.contact;
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
	}*/

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

	openContactModal(type_view = null){

		if (type_view == 3) {
			this.type_view = 3;
			this.title_contact = 'Edit third contact';
		} else {
			this.title_contact = 'Create third contact';
			this.type_view = 1;
		}

		setTimeout( function(){
			$('#contactModal').modal('show');
		},
		230);
	}

	cleanContact () {
		console.log(this.contact);
		this.contact = new Contact();
		console.log(this.contact);
	}
}
