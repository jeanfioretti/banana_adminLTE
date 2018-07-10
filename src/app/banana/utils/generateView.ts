import { GenerateViewService } from '../service/generate-view.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { notifyManage } from './notifyUtil';
import { isArray } from 'util';
declare var $: any;
export class GenerateView{

  constructor(public http: HttpClient){}



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

                  console.log('GenerateView', result);
                  const body: any = result;
                  // if( isArray(body) ){
                    let html='';
                    for (let i = 0; i < body.columns.length; i++) {
                      // console.log('entro en for')
                      this.generateHtml(body.columns[i]) ;

                    }
                    // console.log(body);

                  // }

            },
            msg => {
              if (msg.status == 406) {
                // tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }

  generateHtml(field){
    let html = '';
    switch (field.control_type_id) {
      case 1: html = '<div class="col-md-6">'+
                        '<div class="form-group">'+
                        ' <label >'+ field.name+'</label>'+
                          '<input type="text" class="form-control" [(ngModel)]="'+ field.table_name+ '.'+ field.name+
                      '" [ngModelOptions]="{standalone: true}">'+
                      '</div>' +
                    '</div>';

        break;

      default:
        break;
    }
    console.log(html);
    $('#custom_columns').append(html);
  }

}
