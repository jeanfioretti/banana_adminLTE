import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-countries',
  templateUrl: './settings-countries.component.html',
  styleUrls: ['./settings-countries.component.css']
})
export class SettingsCountriesComponent implements OnInit {

  constructor(public http:HttpClient, public router:Router, private _activateRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  getcountry(id){

  }
}
