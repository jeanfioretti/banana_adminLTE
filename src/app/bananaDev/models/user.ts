export class User {
  public id: number;
  public user_name: string;
  public rol_id: number;
  public email: string;
  public all_access_organization: boolean;
  public all_access_column: boolean;
  public password: string;

  constructor(){
    this.id = 0;
    this.email = '';
    this.password = '';
  }
}
