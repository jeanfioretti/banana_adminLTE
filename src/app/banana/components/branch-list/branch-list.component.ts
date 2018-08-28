import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../utils/notifyUtil';
import { BranchOffice } from '../../models/branch';
import { BananaConstants } from '../../utils/constants';
import { Localization } from '../../models/localization';
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
	localization : Localization = new Localization();
	branch_list : BranchOffice = new BranchOffice();
	type_view : number;

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
	}

	getBranchInsert (branch) {
		this.branch_offices.splice(0, 0, branch);
	}

	changePrincipal (id) {
		for (var i = 0; i < this.branch_offices.length; ++i) {
			if ( this.branch_offices[i].id == id ) {
				this.branch_offices[i].principal = 1;
			} else {
				this.branch_offices[i].principal = 0;
			}
		}
	}

	gotToEditBranch(branch) {
		this.branch_list = branch;
		this.localization = branch.localization;
		this.type_view = 3;
		setTimeout(
			function(){
				$('#branchModal').modal('show');
			},
			230
		);
	}

	cleanBranch(clean_branch) {
		this.type_view = 3;
		this.branch_list = clean_branch;
	}

	archivedBranch(branch, archived): void {
		this.loading = true;
		var msg_info = 'Desarchivando sucursal';
		var msg_success = 'Desarchivado con exito';
		if ( archived ) {
			msg_info = 'Archivando sucursal';
			msg_success = 'Archivado con exito';
		}
		showNotification(msg_info, 2);
		let body : any = {};
		const headers = new HttpHeaders()
			.set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		body.branch_id = branch.id;
		body.archived = archived;

		this.http.put(BananaConstants.urlServer+'api/thirds/branch/archived', body, options).toPromise().then(
			result => {
				showNotification(msg_success, 1);
				branch.archived = archived;
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

	getBranchDelete (branch_delete) {
		for (var i = 0; i < this.branch_offices.length; ++i) {
			if ( this.branch_offices[i].id == branch_delete.id ) {
				this.branch_offices.splice(i,1);
				break;
			}
		}
	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

}
