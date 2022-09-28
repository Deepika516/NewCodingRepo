import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  constructor(private http: HttpClient) { }
  getData():Observable<any>{
    return this.http.get("http://localhost:3000/employees");
  }
}
