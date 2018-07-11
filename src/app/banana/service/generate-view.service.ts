import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { showNotification, notifyManage } from '../utils/notifyUtil';
import { tokenUtil } from '../utils/tokenUtil';
import { Router } from '@angular/router';

@Injectable()
export class GenerateViewService {

  constructor(public http: HttpClient) { }

  getCustomColum(): any {
    const id = sessionStorage.getItem('table_id')
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/CustomColumns/getByTable/' + id, options).toPromise().then(
            result => {

                    return result;
            },
            msg => {
              if (msg.status == 406) {
                // tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

}
