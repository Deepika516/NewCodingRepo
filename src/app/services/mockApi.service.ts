import { HttpClient } from '@angular/common/http';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '../interfaces/users.interface';


@Injectable({
  providedIn: 'root'
})
export class MockServiceService {
  

  constructor(private http: HttpClient) { }
  getData():Observable<IUser[]>{
    return this.http.get<IUser[]>("http://localhost:3000/employees");
  }
  deleteData(id:number):Observable<object>{
    return this.http.delete("http://localhost:3000/employees/"+id);
  }
}
