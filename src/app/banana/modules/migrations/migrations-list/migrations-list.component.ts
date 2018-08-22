import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../../../node_modules/@angular/common/http';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { BananaConstants } from '../../../utils/constants';



declare var $: any;

@Component({
  selector: 'app-migrations-list',
  templateUrl: './migrations-list.component.html',
  styleUrls: ['./migrations-list.component.css']
})
export class MigrationsListComponent implements OnInit {
  dataTable:any;
  dtOptions: DataTables.Settings = {};
  clients: any = [];
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {

      const that = this;

        // this.dtOptions = {
        //   processing: true,
        //   ajax: (dataTablesParameters: any, callback) => {

        //     const headers = new HttpHeaders().set('authorization', window.location.origin)
        //     .append('user', sessionStorage.getItem('user_id'))
        //     .append('token', sessionStorage.getItem('user_token'))
        //     .append('app', 'bananaCli');
        //   const options =  {
        //     headers: headers
        //   };
        //     that.http
        //       .get(
        //         BananaConstants.urlServer + 'api/migration/list',
        //         options
        //       ).subscribe(resp => {
        //         that.clients = resp.data;

        //         callback({
        //           recordsTotal: resp.recordsTotal,
        //           recordsFiltered: resp.recordsFiltered,
        //           data: []
        //         });
        //       });
        //   }

        // };

    // const table: any = $('table');
    // // this.dataTable = table.DataTable();
  }

}
