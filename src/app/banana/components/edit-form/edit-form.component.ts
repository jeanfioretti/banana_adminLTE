import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { showNotification, notifyManage } from '../../utils/notifyUtil';
import { tokenUtil } from '../../utils/tokenUtil';
declare var $: any;
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  editable=false;
  table_id:string;
  titleCrud = '';
  column:any={
    name:''
  };
  column_type:any[];
  all_columns : any[] = [];
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
    showNotification("Obteniendo elementos", 2);
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers
        };
    this.http.get('http://localhost:8000/api/fieldConfig/getfieldList/'+this.table_id , options).toPromise().then(
            result => {
              console.log(result)
              body =  result;
              this.column_type = body.elements;
              this.all_columns = body.columns;
              this.btnloading = false;
              $('.modal-backdrop').fadeOut();
              // $('.modal-backdrop').remove();
            },
            msg => {
              if (msg.status == 406) {
                tokenUtil(this.router);
              }
              this.btnloading = false;
              $('.modal-backdrop').fadeOut();
              // $('.modal-backdrop').remove();
              notifyManage(msg);
          }
      );
  }

  create(): void {

    this.loadingCrud = true;
    showNotification("Creando campo", 2);
    let body : any;
    body = this.column;
    body.table_id = this.table_id
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    console.log(body);
    this.http.post('http://localhost:8000/api/CustomColumns/create', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    showNotification('guardado con exito', 1);
                    this.loadingCrud = false;
                    this.cleanForm();

                    const respBody: any = result;
                    this.all_columns = respBody.columns;
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
    this.column = column;
    console.log('this.column', this.column);
    this.openEditFormCrudModal();

  }
  goToCreate(){
    this.titleCrud = 'Agregar campo'
    this.cleanForm();
    this.editable = false;
    this.openEditFormCrudModal();
  }
  delete(id){

    this.loading = true;
    showNotification("actualizando campo", 2);
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
                    showNotification('Eliminado con exito', 1);
                    this.loading = false;
                    this.cleanForm();
                    this.all_columns = respBody.columns;
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
    showNotification("actualizando campo", 2);
    let body : any;
    body = this.column;
    if(this.column.is_custom === 0){
        body.columnId = this.column.id;
    }else{
      body.customColumnId = this.column.id;
    }
    body.idtable = this.table_id;
    body.authorization = window.location.origin;
    body.user_id = sessionStorage.getItem('user_id');
    body.token = sessionStorage.getItem('user_token');
    body.app = "BananaCli";

    console.log( JSON.stringify( body));
    this.http.post('http://localhost:8000/api/fieldConfig/UpdateConfiguration', body).toPromise().then(
            result => {
                    console.log('result.status', result);
                    const respBody :any=result;
                    showNotification('guardado con exito', 1);
                    this.loadingCrud = false;
                    this.cleanForm();
                    this.all_columns = respBody.columns
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
  this.column={
    name:''
  };
  $('#editFormCrud').modal('hide');
}
openEditFormModal(){
    this.getElements();

    setTimeout(function(){
        $('#editForm').modal('show');
    }, 230);

}
openEditFormCrudModal(){

  setTimeout(function(){
      $('#editFormCrud').modal('show');
      $('.modal-backdrop').fadeOut();
      // $('.modal-backdrop').remove();
  }, 230);

}
}
