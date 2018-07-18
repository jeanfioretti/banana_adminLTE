import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { notifyManage } from '../utils/notifyUtil';
import { TextboxQuestion } from './question-textbox';
import { DropdownQuestion } from './question-dropdown';
import { CheckboxQuestion } from './question-checkbox';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = null;
  @Input() title: FormGroup;
  @Input() entity:any;
  @Input() type:number = 0;

  @Output() public myEvent = new EventEmitter<any>();
  formDynamic: FormGroup;
  payLoad = '';
  loading = false;
  constructor(public http: HttpClient,private qcs: QuestionControlService) {  }

  ngOnInit() {
    // this.formDynamic = this.qcs.toFormGroup(this.questions);
    // this.getCustomColum();
    if(this.type == 0){
      this.getColumns();
    }else if(this.type == 1){
      this.getCustomColum();
    }

  }


  onSubmit() {

    this.myEvent.emit({
      entity: this.formDynamic.value
    });
    this.payLoad = JSON.stringify(this.formDynamic.value);
  }

  getCustomColum(): any {
    const id = sessionStorage.getItem('table_id');
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
                  const body:any = result;
                   this.questions=[];
                   this.buildFormObj(body.columns);
                  // console.log('esto es questions',this.questions)

                  this.formDynamic = this.qcs.toFormGroup(this.questions);

            },
            msg => {
              if (msg.status == 406) {
                // tokenUtil(this.router);
              }
              notifyManage(msg);
          }
      );
  }
  getColumns(): any {
    this.loading =true;
    const id = sessionStorage.getItem('table_id')
    const headers = new HttpHeaders().set('Authorization', window.location.origin)
    .append('user_id', sessionStorage.getItem('user_id'))
    .append('token', sessionStorage.getItem('user_token'))
    .append('app', 'bananaCli');
    const options =  {
            headers: headers,
            params: {
              table_id: id
            }
        };
    this.http.get('http://localhost:8000/api/access/tables/columns', options).toPromise().then(
            result => {

                  // console.log('getColumsAlpapa', result);
                  const body:any = result;
                    this.questions=[];
                    this.buildFormObj(body.columns);
                    this.buildFormObj(body.custom_columns);

                   console.log('esto es questions',this.questions)
                  //  this.loading =false;

                   this.formDynamic = this.qcs.toFormGroup(this.questions);

            },
            msg => {
              if (msg.status == 406) {
                // tokenUtil(this.router);
              }
              this.loading = false;
              notifyManage(msg);
          }
      );
  }

  buildFormObj(columns) {
    let quest: any;

    for (let i = 0; i < columns.length; i++) {
      if(columns.order == null){
        columns.order = i+1;
      }
      if( !isNullOrUndefined(this.entity[columns[i].key]) ){
        columns[i].value = this.entity[columns[i].key]
      }

      switch (columns[i].control_type) {
        case 'textbox':
            quest =  new TextboxQuestion(columns[i]);
            this.questions.push(quest);
          break;
        case 'dropdown':
          columns[i].options = columns[i].REFERENCED_TABLE_NAME;
          quest = new DropdownQuestion(columns[i]);
          this.questions.push(quest);
        break;
        case 'checkbox':
          quest = new CheckboxQuestion(columns[i]);
          this.questions.push(quest);
        break;

      }


    }

    this.questions.sort((a, b) => a.order - b.order);
  }

  launchChanges(childEvent){
    this.myEvent.emit({childEvent:childEvent,values:this.formDynamic.value});
  }

}
