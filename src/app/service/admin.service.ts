import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';

@Injectable()
export class adminService {
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private config: Configuration) { }

//   newEntryUser(userInput,inputParameter) {
//     // debugger;
//     const serializer = new DefaultUrlSerializer();
//     const paramSerializer = serializer.parse('');
//     paramSerializer.queryParams = inputParameter;
//     const params = serializer.serialize(paramSerializer);
//     return this.http.post(this.config.newEntryUser + params, JSON.stringify(userInput), this.httpOptions);
//   }
getAdminList(inputParameter) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getAdminDetail + params, this.httpOptions);        
  }

  getInformedUsers(id) {
    debugger;
    return this.http.get(this.config.getUserDetail+ '/' + id);          
  }

  updateUser(inputParameter,id) {
    debugger;     
    return this.http.put(this.config.updateUserProfile + '/' + id , JSON.stringify(inputParameter), this.httpOptions);
   
  }
  
}
