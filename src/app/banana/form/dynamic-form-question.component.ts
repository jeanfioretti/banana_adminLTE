import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from './question-base';


@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() type:number = 0;
  @Output() public myChangeEvent = new EventEmitter<any>();
  get isValid() { return this.form.controls[this.question.key].valid; }

  launchEvent(idcolumn,myValue){
    this.myChangeEvent.emit({
      id: idcolumn
    });
  }

}
