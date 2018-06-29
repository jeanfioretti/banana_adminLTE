import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenUtil } from '../../utils/tokenUtil';
import { notifyManage } from '../../utils/notifyUtil';

declare var $: any;
@Component({
  selector: 'app-custom-columns',
  templateUrl: './custom-columns.component.html',
  styleUrls: ['./custom-columns.component.scss']
})
export class CustomColumnsComponent implements OnInit {
  editable=false;
  table_id:string;
  titleCrud = '';
  custom_column:any={
    name:''
  };
  column_type:any[];
  all_custom_columns : any[] = [];
  btnloading = false;
  loadingCrud = false;
  loading = false;
  constructor(public http: HttpClient, public router: Router) { }

  ngOnInit() {

  }

  getElements(): void {
    this.table_id = sessionStorage.getItem('table_id');
    let body: any={};
    this.btnloading = true;
    this.showNotification("Obteniendo elementos", 2);
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
        };
    this.http.get('http://localhost:8000/api/CustomColumns/getElementsView/' + this.table_id, options).toPromise().then(
            result => {
              console.log(result)
              body =  result;
              this.column_type = body.elements;
              this.all_custom_columns = body.columns;
              this.btnloading = false;
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.btnloading = false;
              notifyManage(msg);
          }
      );
  }

  create(): void {

    this.loadingCrud = true;
    this.showNotification("Creando campo", 2);
    let body : any;
    body = this.custom_column;
    body.table_id = this.table_id
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    console.log(body);
    this.http.post('http://localhost:8000/api/CustomColumns/create', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    this.showNotification('guardado con exito', 1);
                    this.loadingCrud = false;
                    this.cleanForm();

                    const respBody: any = result;
                    this.all_custom_columns = respBody.columns
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loadingCrud = false;
              notifyManage(msg);
          }
      );
  }
  goToEdit(column){
    this.titleCrud = 'Editar campo'
    this.editable = true;
    this.custom_column = column;
    this.custom_column.id_type = column.type_id;
    this.openCustomColumnsCrudModal();
  }
  goToCreate(){
    this.titleCrud = 'Agregar campo'
    this.cleanForm();
    this.editable = false;
    this.openCustomColumnsCrudModal();
  }
  delete(id){

    this.loading = true;
    this.showNotification("actualizando campo", 2);
    const body: any = {};
    body.id = id;
    body.table_id = this.table_id;
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    // console.log( JSON.stringify( body));
    this.http.post('http://localhost:8000/api/CustomColumns/deleteColumn', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    const respBody: any = result;
                    this.showNotification('Eliminado con exito', 1);
                    this.loading = false;
                    this.cleanForm();
                    this.all_custom_columns = respBody.columns
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loading = false;
              notifyManage(msg);
          }
      );

  }
  update(){

    this.loadingCrud = true;
    this.showNotification("actualizando campo", 2);
    let body : any;
    body = this.custom_column;
    body.table_id = this.table_id
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    // console.log( JSON.stringify( body));
    this.http.post('http://localhost:8000/api/CustomColumns/UpdateColumn', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    const respBody :any=result;
                    this.showNotification('guardado con exito', 1);
                    this.loadingCrud = false;
                    this.cleanForm();
                    this.all_custom_columns = respBody.columns
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.loadingCrud = false;
              notifyManage(msg);
          }
      );
  }
cleanForm(){
  this.custom_column={
    name:''
  };
  $('#CustomColumsCrud').modal('hide');
}
openCustomColumnsModal(){
    this.getElements();

    setTimeout(function(){
        $('#CustomColums').modal('show');
    }, 230);

}
openCustomColumnsCrudModal(){

  setTimeout(function(){
      $('#CustomColumsCrud').modal('show');
  }, 230);

}

showNotification(mess, typeMess){
  const type = ['','info','success','warning','danger'];

  $.notify({
      icon: 'notifications',
      message: mess

  },{
      type: type[typeMess],
      timer: 4000,
      placement: {
          from: 'top',
          align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}

}
