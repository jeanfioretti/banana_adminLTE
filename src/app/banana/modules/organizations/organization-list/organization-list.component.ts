import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { AuthBanana } from '../../../utils/auth';
import { BananaConstants } from '../../../utils/constants';

declare var $: any;

@Component({
	selector: 'app-organization-list',
	templateUrl: './organization-list.component.html',
	styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {

	public loading = false;
	public titleTable: string;
	public body: any ;
	public organizations: any = [];
	public keyword:any;
	public kanban : boolean;
	collapsed : boolean = false;

	constructor(public http: HttpClient, public router: Router) { }

	ngOnInit() {
		AuthBanana(this.router);
		this.getOrganizations();
		this.titleTable = 'Organizaciones';
		sessionStorage.setItem('table_id', '2');
	  }
	  
	viewKanban(){
		this.kanban = !this.kanban;
	}

	collapsedCard(){
		this.collapsed = !this.collapsed;
	}

	getOrganizations(): void {
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
		};

		this.http.get(BananaConstants.urlServer+'api/organizations', options).toPromise()
			.then(
		    	result => {
	                this.loading = false;
	                this.body = result;
	                this.organizations = this.body.organizations;
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

	search() : void {
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
				headers: headers,
				params: { filter: this.keyword}
			};
		this.http.get(BananaConstants.urlServer+'api/organizations/filter', options).toPromise()
			.then(
				result => {
					this.loading = false;
					this.body = result;
					this.organizations = this.body.filter_organizations;
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

	archivedOrganization(organization, archived) : void {
		this.loading = true;
		showNotification("Archivando organizacion", 2);
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers
		};
		const body = {
			id : organization.id,
			archived: archived
		};

		this.http.put(BananaConstants.urlServer + 'api/organizations/archived', body, options).toPromise()
			.then(
				result => {
					this.loading = false;
					organization.archived = archived;
					showNotification('archivado con exito', 1);
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

	goToCreateOrganization(){
		showNotification('Redireccionando.. espere', 3);
		this.router.navigate(['app/organizations/new']);
	}

	goToEditOrganization(id){
		showNotification('Redireccionando.. espere', 3);
		this.router.navigate(['app/organizations/edit/' + id]);
	}

}
