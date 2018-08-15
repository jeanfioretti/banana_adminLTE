import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { showNotification, notifyManage } from '../../utils/notifyUtil';
import { tokenUtil } from '../../utils/tokenUtil';
import { HttpClient, HttpHeaders } from '../../../../../node_modules/@angular/common/http';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { BananaConstants } from '../../utils/constants';

@Component({
  selector: 'app-migrations',
  templateUrl: './migrations.component.html',
  styleUrls: ['./migrations.component.css']
})
export class MigrationsComponent implements OnInit {
  tables: string[];
  public data:any;
  public type:number;
  public fileReaded:any;
  public headerCount:number;
  public guideMigration: any[]=[];
  public loading = false;
  public selectColumns:any[] = [];
  jsonImport:any[]=[];
  constructor(public http: HttpClient, public router: Router, private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getClientColumn()
  }

  getClientColumn(): void {
    this.loading = true;
    showNotification("Obteniendo Elementos", 2);
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
      .append('user_id', sessionStorage.getItem('user_id'))
      .append('token', sessionStorage.getItem('user_token'))
      .append('app', 'bananaCli');
    const options =  {
      headers: headers,
    };
    this.http.get(BananaConstants.urlServer+'api/migration/clients', options).toPromise().then(
      result => {
        let body : any = result;
        this.selectColumns = body.columns;
        this.loading = false;
        this.tables = Array.from(new Set(this.selectColumns.map(({table_name}) => table_name)));
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

  xlsFile(evt: any) {
    this.jsonImport = [];
    this.guideMigration = [];
    this.data = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    // tslint:disable-next-line:curly
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const jsonData = XLSX.utils.sheet_to_json(ws)

      // for (let i = 0; i < jsonData.length; i++) {
      //     this.jsonImport.push(jsonData[i]);
      // }
      this.jsonImport = jsonData;

      // console.log(this.jsonImport);


      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.generateMigrationGuide();
    };
    reader.readAsBinaryString(target.files[0]);
  }

  convertFile(csv: any) {
    this.jsonImport = [];
    this.data = [];
    this.fileReaded = csv.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
    let csv: string = reader.result;

      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(';');
      let lines = [];



      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
          let data = allTextLines[i].split(';');
          if (data.length === headers.length) {
          let tarr = [];
          let oneTime = true
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          if( i != 0 && oneTime ){

            let objeto : any={};

            for (let x = 0; x < headers.length; x++) {

               objeto[headers[x]]=data[x];

             }

            this.jsonImport.push(objeto);
            oneTime = false;

          }

        // log each row to see output

        lines.push(tarr);
        }
    }

    this.data = lines;
    this.generateMigrationGuide();
    }
  }

  sendMigration(): void {

    this.loading = true;
    showNotification("Creando tercero", 2);
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');

    const options =  {
      headers: headers,
    };

    let body : any = {};
    // body.guideMigration = this.guideMigration;
    body.guideMigration = this.toSendGuide()
    // body.jsonImport = this.jsonImport;
    body.jsonImport = this.toSenData()
    console.log( JSON.stringify(body))

    this.http.post(BananaConstants.urlServer+'api/thirds/create', body, options).toPromise().then(
      result => {
        showNotification('Migracion completa', 1);
        body = result;
        this.loading = false;
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

  generateMigrationGuide(){
    this.headerCount = Object.keys(this.data[0]).length;
      let obj : any = {};
      let i = 0;
      // console.log( this.data[0])
      this.data[0].forEach((item, index) => {
        obj = {
          columnName: item,
          columnFile:index,
          column : null
        };
        this.guideMigration.push(obj);
        // this.guideMigration[item] = obj;
      });
      console.log(this.guideMigration);
  }

  selectColumn(idColumn){
    console.log(idColumn)

    this.selectColumns.forEach(element => {
      if(element.id_column == idColumn.id_column){
        element.selected = 1;
      }
    });

  }
  clean(){
    this.selectColumns.forEach(element => {

        element.selected = 0;

    });
    this.guideMigration.forEach(element => {

        element.column = null;
    });

  }

   toSendGuide(){
    let result:any = {};

    this.guideMigration.forEach((item, index) => {
      result[item.columnName] = item ;
    });
    console.log(result);
    return  result;
   }
   toSenData(){
      let auxData:any[]=[];
      let auxReg:any ={};
      let is_valid=false;

      for (let i = 1; i < this.data.length; i++) {
        // const element = this.data[i];
        auxReg = {}
        for (let j = 0; j < this.data[i].length; j++) {

          if(this.guideMigration[j].column != null){
            // console.log(this.guideMigration[j])

            auxReg[this.guideMigration[j].columnName]=this.data[i][j]

          }
        }
        auxData.push(auxReg)

      }
      return auxData;

   }
}
