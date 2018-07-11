import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	kanban : boolean = false;
	collapsed : boolean = false;
	@Input() contacts : any = [];

	constructor() { }

	ngOnInit() {
  	}

	viewKanban(type){
		this.kanban = type;
	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

}
