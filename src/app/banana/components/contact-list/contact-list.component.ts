import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact';
declare var $: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	collapsed : boolean = false;
	@Input() contacts : Array<any> = [];
	contact_list : Contact = new Contact();
	type_view : number;	

	constructor() { }

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

}
