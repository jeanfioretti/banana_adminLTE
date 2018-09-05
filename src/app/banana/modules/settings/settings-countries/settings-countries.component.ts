import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from '../../../models/country';


@Component({
  selector: 'app-settings-countries',
  templateUrl: './settings-countries.component.html',
  styleUrls: ['./settings-countries.component.css']
})
export class SettingsCountriesComponent implements OnInit {

 country: Country = new Country();

 

  constructor(public http:HttpClient, public router:Router, private _activateRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  getcountry(id){

  }

  createCountry(){

  }

  updateCountry(){

  }

  archivedCuntry(){
    
  }
}
