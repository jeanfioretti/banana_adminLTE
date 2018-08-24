import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-migrations-list',
  templateUrl: './migrations-list.component.html',
  styleUrls: ['./migrations-list.component.css']
})
export class MigrationsListComponent implements OnInit {
  dataTable:any;
  clients: any[];
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {


      this.http.get('https://5a5a9e00bc6e340012a03796.mockapi.io/clients')
        .subscribe((data: any[]) => this.clients = data);

    const table: any = $('table');
    this.dataTable = table.DataTable();
  }

}
