import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {
  controlType = 'checkbox';
  checked: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.checked = options['value'] == 1? true : false;
  }
}
