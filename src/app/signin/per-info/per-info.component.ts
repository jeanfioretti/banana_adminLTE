import { Component, OnInit } from '@angular/core';
import {Info} from '../../banana/models/info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenUtil } from '../../banana/utils/tokenUtil';
import { notifyManage, showNotification } from '../../banana/utils/notifyUtil';
import { BananaConstants } from '../../banana/utils/constants';
import { Router, ActivatedRoute } from '@angular/router';

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
<<<<<<< HEAD
    body=this.client;
=======
    //body : this.client;
>>>>>>> 3d4c9a3476cfdaa3c8a3ff22ed4e52e61178c359

    //let loading: boolean;
    
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

  update_info(){
    let body:any;
    body=this.client;
    let loading:boolean;

    this.http.get(BananaConstants.urlServer+"api/personal/update",body).toPromise().then(
      result =>{
        showNotification('Modificacion personal hecha con exito',2);
        this.body=result;
        this.client= this.body.client;
        this.loading=false;
      },msg =>{
        if(msg.status==406){
          tokenUtil(this.router);
        }
        this.loading=false;
      }
    );


  }
}
