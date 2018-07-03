import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Localization } from '../../models/localization';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage } from '../../utils/notifyUtil';


declare var $: any;

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {
  localizationTitle : string ='Crear Localizacion';
  @Input() localization : Localization = new Localization();
  @Input() countries : any = [];
  @Input() states : any = [];
  @Input() cities : any = [];
  body: any;

  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/location/countries', options).toPromise().then(
            result => {
              this.body = result;
              this.countries = this.body.countries;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

  getStates(country_id) {
    this.states = [];
    this.cities = [];
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/location/states?country_id='+country_id, options).toPromise().then(
            result => {
              this.body = result;
              this.states = this.body.states;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

  getCities(state_id) {
    this.cities = [];
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/location/cities?state_id='+state_id, options).toPromise().then(
            result => {
              this.body = result;
              this.cities = this.body.cities;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

  openLocalizationModal(){
      setTimeout(function(){
          $('#localizationModal').modal('show');
      }, 230);
  }

}
