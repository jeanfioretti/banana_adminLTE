import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { notifyManage } from '../utils/notifyUtil';

@Injectable()
export class QuestionService {
   questions: QuestionBase<any>[] = [
  ];

  constructor(public http: HttpClient){}

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    // this.questions = this.getCustomColum();
    // let questions: QuestionBase<any>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),


    // ];

    return this.questions;
  }


}
