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
	type_view : number;
	contact : Contact = new Contact();
	third_id : number;
	body : any;
	@Output() createEvent = new EventEmitter<any>();

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {

		this.third_id = this._activeRoute.snapshot.params['id'];
		this._activeRoute.url.subscribe(url => {

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

	getContact(id): void {
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
	}

	createThirdContact(): void {

		this.loading = true;
		showNotification("Creando contacto", 2);
		let body : any;
		body = this.contact;
		body.third_id = this.third_id;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		console.log(body);
		this.http.post('http://localhost:8000/api/thirds/contact/create', body).toPromise().then(
			result => {
				console.log('result.status', result);
				showNotification('guardado con exito', 1);
				this.createEvent.emit({ contact:this.contact });
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

	openContactModal(action = null){

		if (action == 'edit') {
			this.getContact(this.contact.id);
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
}
