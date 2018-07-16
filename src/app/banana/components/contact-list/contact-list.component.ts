import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { Contact } from '../../models/contact';
declare var $: any;

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	loading = false;
	body : any;
	collapsed : boolean = false;
	@Input() contacts : Array<any> = [];
	@Output() contactArchived = new EventEmitter<any>();
	contact_list : Contact = new Contact();
	type_view : number;	

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
  	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

	getContactInsert (contact) {
		this.contacts.splice(0, 0, contact);
	}

	gotToEditContact(contact) {
		this.contact_list = contact;
		this.type_view = 3;
		setTimeout(
			function(){
				$('#contactModal').modal('show');
			},
			230
		);
	}

	cleanContact(clean_contact) {
		this.type_view = 3;
		this.contact_list = clean_contact;
	}

	archivedContact(contact, archived): void {
		this.loading = true;
		showNotification("Archivando contacto", 2);
		const body = {
			authorization: window.location.origin,
			user_id: sessionStorage.getItem('user_id'),
			token: sessionStorage.getItem('user_token'),
			app:'bananaCli',
			contact_id : contact.id,
			archived: archived
		};

		this.http.post('http://localhost:8000/api/contacts/archived', body).toPromise().then(
			result => {
				//this.body = result;
				showNotification('archivado con exito', 1);
				contact.archived = archived;
				this.contactArchived.emit(contact);
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
		showNotification("Eliminando contacto", 2);
		const body = {
			authorization: window.location.origin,
			user_id: sessionStorage.getItem('user_id'),
			token: sessionStorage.getItem('user_token'),
			app:'bananaCli',
			contact_id : contact.id
		};

		/*this.http.post('http://localhost:8000/api/contacts/archived', body).toPromise().then(
			result => {
				//this.body = result;
				showNotification('archivado con exito', 1);
				contact.archived = archived;
				this.contactArchived.emit(contact);
				this.loading = false;
			},
			msg => {
				if (msg.status == 406) {
					tokenUtil(this.router);
				}
				this.loading = false;
				notifyManage(msg);
			}
		);*/
	}

}
