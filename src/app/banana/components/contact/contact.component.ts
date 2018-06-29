import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage } from '../../utils/notifyUtil';
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
  @Input() contact : Contact = new Contact ();
  body : any;

  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {

  	this._activeRoute.url.subscribe(url => {

	    if(url[2].path === 'edit'){

	      this.title_contact = 'Edit Third';
	      this.type_view = 3;
	      this.getContact(this.id);

	    } else {

	      this.title_contact = 'Create Third';
	      this.type_view = 1;

	    }
	});

  }

}
