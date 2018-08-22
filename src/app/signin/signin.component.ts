import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  client: any = {};
  description: string;  
  bdhost:string;
  bduser:string;
  bdpassword:string;
  bsssdriver:string;
  dns:string;
  nameConBD:string;
  storageURL:string;
  NamestorageURL:string; 


  constructor() { }

  ngOnInit() {


  }

}
