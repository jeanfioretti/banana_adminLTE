import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { BranchOffice } from '../../models/branch';
import { BananaConstants } from '../../utils/constants';
declare var $: any;

@Component({
	selector: 'app-branch-list',
	templateUrl: './branch-list.component.html',
	styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
	loading = false;
	body : any;
	collapsed : boolean = true;
	@Input() branch_offices : Array<any> = [];
	branch_list : BranchOffice = new BranchOffice();
	type_view : number;

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

}
