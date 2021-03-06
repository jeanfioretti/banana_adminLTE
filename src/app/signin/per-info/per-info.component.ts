import { Component, OnInit } from '@angular/core';
import {Info} from '../../banana/models/info';
import { HttpClient } from '../../../../node_modules/@angular/common/http/http';
import { monthsShort } from '../../../../node_modules/moment';
import { tokenUtil } from '../../banana/utils/tokenUtil';
import { notifyManage, showNotification } from '../../banana/utils/notifyUtil';
import { shallowEqual } from '../../../../node_modules/@angular/router/src/utils/collection';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { BananaConstants } from '../../banana/utils/constants';

@Component({
  selector: 'app-per-info',
  templateUrl: './per-info.component.html',
  styleUrls: ['./per-info.component.css']
})


export class PerInfoComponent implements OnInit {

   client: Info = new Info();

   loading: boolean;
   body: any;

  constructor(public http:HttpClient, public router:Router, private  _activateroute:ActivatedRoute) { }

  ngOnInit() {
  }

  create_info(){
    let body: any;
    body:this.client;

    let loading: boolean;
    
    this.http.get(BananaConstants.urlServer+'api/personal/create', body).toPromise().then(
      result =>{
        showNotification('Registro personal hecho el exito',2);
        this.body = result;
        this.client=this.body.client;
        this.loading= false;
      }, msg =>{
        if(msg.status ==406){
          tokenUtil(this.router);
        }
        this.loading=false;
        notifyManage(msg);
      }
    );


  }
}
