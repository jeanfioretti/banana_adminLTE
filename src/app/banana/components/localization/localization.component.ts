import { Component, OnInit, Input, /* Output, EventEmitter, */ OnChanges, SimpleChanges} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage } from '../../utils/notifyUtil';
import { Localization } from '../../models/localization';
import { BananaConstants } from '../../utils/constants';


//declare var $: any;

@Component({
	selector: 'app-localization',
	templateUrl: './localization.component.html',
	styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit, OnChanges {
	loading = false;
	localizationTitle : string ='Localizacion';
	@Input() id_modal : string;
	@Input() localization : Localization = new Localization();
	@Input() countries : any = [];
	@Input() states : any = [];
	@Input() cities : any = [];
	//@Output() address = new EventEmitter<any>();
	create_location : boolean = false;
	searching : boolean = false;
	search : string = '';
	locations_search : Array<any> = [];
	body: any;

	constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

	ngOnInit() {
		this._activeRoute.url.subscribe(url => {
			if (url[2].path == 'new')
				this.create_location = true;
		});
		this.getCountries();
	}

	ngOnChanges (changes : SimpleChanges) {
		// for (let propName in changes) {
		// 	let chng = changes[propName];
		// 	let cur  = JSON.stringify(chng.currentValue);
		// 	let prev = JSON.stringify(chng.previousValue);
		// 	console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
		// }
		//setTimeout(() => { this.fullAddress(); }, 0);
	}

	searchingLocation (): void {
		if (this.search.length >= 3) {
		  this.searching = true;
		  this.searchLocation();
		} else {
		  this.searching = false;
		  this.locations_search = [];
		}
	}

	searchLocation () {
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
			params: { search: this.search }
		};

		this.http.get(BananaConstants.urlServer+'api/location/search', options).toPromise().then(
			result => {
				this.body = result;
				this.locations_search = this.body.search_locations;
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

	selectLocation (localization) {
		this.localization = localization;
		this.locations_search = [];
		this.searching = false;
		this.search = '';
	}

	/* fullAddress () {
		let me = this;
		var full_address = '';
		var address = '';

		Object.keys(me.localization).forEach(element => {
			
			if (element == 'id' || element == 'created_at' || element == 'updated_at' || element == 'archived')
				return;
			
			switch (element) {

				case 'country_id':
					me.countries.map(function (obj) {
						if (obj.id == me.localization[element])
							address = obj.country;
					});
					break;
				
				case 'state_id':
					me.states.map(function (obj) {
						if (obj.id == me.localization[element])
							address = obj.state;
					});
					break;
				
				case 'city_id':
					me.cities.map(function (obj) {
						if (obj.id == me.localization[element])
							address = obj.city;
					});
					break;

				default:
					address = me.localization[element];
					break;
			}
			full_address += ( address != null && address != '' ) ? address + ' '  : '';
		});
		this.address.emit( full_address );
	} */

	getCountries() {
		this.loading = true;
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer+'api/location/countries', options).toPromise().then(
			result => {
				this.loading = false;
				this.body = result;
				this.countries = this.body.countries;
			},
			msg => {
				if (msg.status == 406) {
					tokenUtil(this.router);
				}
				this.loading = false
				notifyManage(msg);
			}
		);
	}

	getStates(country_id) {
		if (country_id == null) return;
		this.loading = true;
		this.states = [];
		this.cities = [];
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer+'api/location/states?country_id='+country_id, options).toPromise().then(
			result => {
				this.loading = false;
				this.body = result;
				this.states = this.body.states;
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

	getCities(state_id) {
		if (state_id == null) return;
		this.loading = true;
		this.cities = [];
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		this.http.get(BananaConstants.urlServer+'api/location/cities?state_id='+state_id, options).toPromise().then(
			result => {
				this.loading = false;
				this.body = result;
				this.cities = this.body.cities;
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

	/* openLocalizationModal(){
		var id_modal = '#'+this.id_modal;
		setTimeout( function(){
			$(id_modal).modal('show');
		},
		230);
	} */

}
