import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenUtil } from '../../../utils/tokenUtil';
import { notifyManage, showNotification } from '../../../utils/notifyUtil';
import { AuthBanana } from '../../../utils/auth';
import { BananaConstants } from '../../../utils/constants';


declare var $: any;

@Component({
	selector: 'app-third-parties-list',
	templateUrl: './third-parties-list.component.html',
	styleUrls: ['./third-parties-list.component.scss']
})
export class ThirdPartiesListComponent implements OnInit {

	public loading = false;
	public titleTable: string;
	public body: any ;
	public thirds: any = [];
	public keyword:any;
	public kanban:boolean;

  constructor(public http: HttpClient, public router: Router) { }

	ngOnInit() {
		AuthBanana(this.router);
		this.getThirds('Thirds');
		this.titleTable = 'Thirds';
		sessionStorage.setItem('table_id', '17');
	}

	viewKanban(){
		this.kanban = !this.kanban;
	}

	getThirds(type_third): void {
		this.titleTable = type_third;
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
			params: { type_third: type_third }
		};

		this.http.get(BananaConstants.urlServer+'api/thirds', options).toPromise()
			.then(
		    	result => {
	                //console.log('result.status', result);
	                // const body = result;
	                this.loading = false;
	                this.body = result;
	                this.thirds = this.body.thirds;
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
		this.http.get(BananaConstants.urlServer+'api/thirds/filter', options).toPromise()
			.then(
				result => {
					//console.log('result', result);
					this.loading = false;
					this.body = result;
					this.thirds = this.body.filter_thirds;
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

	archivedThird(third, archived) : void {
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers
		};
		const body = {
			third_id : third.id,
			archived: archived
		};
		this.http.put(BananaConstants.urlServer+'api/thirds/archived', body, options).toPromise()
			.then(
				result => {
					this.loading = false;
					third.archived = archived;
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

	goToCreateThird(){
		showNotification('Redireccionando.. espere', 3);
		this.router.navigate(['app/third-parties/new']);
	}

	goToEditThird(id){
		showNotification('Redireccionando.. espere', 3);
		this.router.navigate(['app/third-parties/edit/' + id]);
	}

}
