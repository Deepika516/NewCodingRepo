import { Role } from 'src/app/enums/role.enum';

export interface IUser
 {
  id:string|number;
  address:string;
  email:string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_no: number;
  role: Role;
  doj:Date;
}


