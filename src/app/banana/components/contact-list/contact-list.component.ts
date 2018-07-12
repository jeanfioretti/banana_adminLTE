import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	kanban : boolean = false;
	collapsed : boolean = false;
	@Input() contacts : any = [];
	contact : Contact = new Contact();
	type_view : number;
	@Output() contactInsert = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
  	}

	viewKanban(type){
		this.kanban = type;
	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

	getContactInsert (contact) {
		this.contactInsert.emit( contact );
	}

	gotToEditContact(contact) {
		this.contact = contact;
		this.type_view = 3;
		console.log(this.contact);
	}

}
