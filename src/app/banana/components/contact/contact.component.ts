import { Component, OnInit, Input } from '@angular/core';
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
	body : any;

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {

		/*this._activeRoute.url.subscribe(url => {

			if(url[2].path === 'edit'){

				this.title_contact = 'Edit third contact';
				this.type_view = 3;
				this.getContact(this.contact.id);

			} else {

				this.title_contact = 'Create third contact';
				this.type_view = 1;

			}
		});*/

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
		body.third_contact = this.contact;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		console.log(body);
		this.http.post('http://localhost:8000/api/thirds/contact/create', body).toPromise().then(
			result => {
				/*console.log('result.status', result);
				showNotification('guardado con exito', 1);
				showNotification('Redireccionando.. espere', 3);
				this.body = result;
				this.third = this.body.third;
				this.router.navigate(['app/third-parties/edit/' + this.third.id]);
				this.loading = false;*/
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

	openNewContactModal(){
		this.title_contact = 'Create third contact';
		setTimeout( function(){
			$('#newContactModal').modal('show');
		},
		230);
	}
}
