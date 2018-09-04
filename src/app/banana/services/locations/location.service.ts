import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../utils/constants';

@Injectable()
export class LocationService {
	body : any = {};
	countries : any;

	constructor(public http: HttpClient) { }

	getCountries () {
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers
		};
		return this.http.get(BananaConstants.urlServer+'api/location/countries', options);
	}

	getStates (country_id) {
		if (country_id == null) country_id = '';
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		return this.http.get(BananaConstants.urlServer+'api/location/states?country_id='+country_id, options)
	}

	getCities (state_id) {
		if (state_id == null) state_id = '';
		const headers = new HttpHeaders().set('authorization', window.location.origin)
			.append('user', sessionStorage.getItem('user_id'))
			.append('token', sessionStorage.getItem('user_token'))
			.append('app', 'BananaCli');
		const options =  {
			headers: headers,
		};
		return this.http.get(BananaConstants.urlServer+'api/location/cities?state_id='+state_id, options)
	}

}
