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
	public kanban:false;

  constructor(public http: HttpClient, public router: Router) { }

	ngOnInit() {
		AuthBanana(this.router);
		this.getThirds();
		this.titleTable = 'Terceros';
		sessionStorage.setItem('table_id', '17');
	}

	viewKanban(type){
		this.kanban = type;
	}

	getThirds(): void {
		this.loading = true;
		const headers = new HttpHeaders().set('Authorization', window.location.origin)
			.append('user_id', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'bananaCli');
		const options =  {
			headers: headers,
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

	archivedThird(id, archived) : void {
		this.loading = true;
		const body = {
			authorization: window.location.origin,
			user_id: sessionStorage.getItem('user_id'),
			token: sessionStorage.getItem('user_token'),
			app:'bananaCli',
			third_id : id,
			archived: archived
		};
		//console.log(body);
		this.http.post(BananaConstants.urlServer+'api/thirds/archived', body).toPromise()
			.then(
				result => {
					this.loading = false;
					console.log('result.status', result);
					this.getThirds();
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
