export class BranchOffice {
  public id : number;
  public organization_id : number;
  public location_id : number;
  public name : string;
  public is_ship_to : boolean;
  public is_bill_to : boolean;
  public is_pay_from : boolean;
  public is_remit_to : boolean;
  public phone : string;
  public phone_2 : string;
  public fax : string;
  public isdn : string;
  
  constructor(){
    this.id = 0;
    this.organization_id = null;
    this.location_id = null;
    this.name = '';
    this.is_ship_to = false;
    this.is_bill_to = false;
    this.is_pay_from = false;
    this.is_remit_to = false;
    this.phone = '';
    this.phone_2 = '';
    this.fax = '';
    this.isdn = '';
  }
}