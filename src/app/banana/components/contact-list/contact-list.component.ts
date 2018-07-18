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
	collapsed : boolean = true;
	@Input() contacts : Array<any> = [];
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
		var msg_info = 'Desarchivando contacto';
		var msg_success = 'Desarchivado con exito';
		if ( archived ) {
			msg_info = 'Archivando contacto';
			msg_success = 'Archivado con exito';
		}
		showNotification(msg_info, 2);
		let body : any = {};
		body.contact_id = contact.id;
		body.archived = archived;
		body.authorization = window.location.origin;
		body.user_id = sessionStorage.getItem('user_id');
		body.token = sessionStorage.getItem('user_token');
		body.app = "BananaCli";

		this.http.post('http://localhost:8000/api/contacts/archived', body).toPromise().then(
			result => {
				//this.body = result;
				showNotification(msg_success, 1);
				contact.archived = archived;
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

	getContactDelete (contact_delete) {
		for (var i = 0; i < this.contacts.length; ++i) {
			if ( this.contacts[i].id == contact_delete.id ) {
				this.contacts.splice(i,1);
				break;
			}
		}
	}

}
