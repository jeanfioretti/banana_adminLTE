import { Component, OnInit } from '@angular/core';
import {Signin} from '../banana/models/signin';
import { BananaConstants } from '../banana/utils/constants';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http/http';
import { monthsShort } from '../../../node_modules/moment';
import { tokenUtil } from '../banana/utils/tokenUtil';
import { notifyManage, showNotification } from '../banana/utils/notifyUtil';
import { shallowEqual } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  client: Signin = new Signin();
  loading: boolean;
  body: any;


  constructor(public http:HttpClient, public router:Router, private  _activateroute:ActivatedRoute ) { }

  ngOnInit() {

  }

  createCliente (){
    let loading =true;
    let body: any;

    body = this.client;

    this.http.get(BananaConstants.urlServer+'api/signin/create', body).toPromise().then(
      result =>{
        showNotification('Registro creado con exito',2);
        this.body = result;
        this.client= this.body.client;
      
        this.loading = false;
        
      },msg=>{
        if(msg.status ==406){
            tokenUtil(this.router);
        }
        this.loading=false;
        notifyManage(msg);
      }
    );
  
  }

  updateCliente(){
    let loading= true;
    let body: any;

    body= this.client;

    this.http.get(BananaConstants.urlServer+'api/signin/update', body).toPromise().then(
      result=>{
        showNotification('Registro actualizado con exito',2);

        this.body = result;
        this.client= this.body.client;
        this.loading = false;

      }, msg=>{
        if(msg.status ==406){
          tokenUtil(this.router);
        }
        this.loading=false;
         notifyManage(msg);
      }
    );
  }

}
