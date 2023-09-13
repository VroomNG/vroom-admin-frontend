import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest, HttpEvent } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer, Params } from '@angular/router';

@Injectable()
export class driverService {
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
getDriverList(inputParameter: { [x: string]: any; token?: any; isonline?: any; fil?: any; year?: any; filter?: any; },statusId: number) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    if(statusId == 3)
    return this.http.get(this.config.getDriverInactiveDetail+ params, this.httpOptions); 
    else if(statusId == 2)
    return this.http.get(this.config.getPendingDetail+ params, this.httpOptions); 
    else
    return this.http.get(this.config.getDriverDetail + params, this.httpOptions);        
  }

  getDriverReviewList(inputParameter: { [x: string]: any; token?: any; },user: string | number) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getDriverReviewDetail + '/' + user + params, this.httpOptions);        
  }
  deleteDriverReview(inputParameter: { [x: string]: any; token?: any; },id: string) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);  
    return this.http.delete(this.config.deletedriverReview  + '/' + id + params, this.httpOptions);       
  }
  getDashboardList(inputParameter: { [x: string]: any; token?: any; }) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);   
    return this.http.get(this.config.getDashboardDetail + params, this.httpOptions);        
  }
  getDriverPayments(inputParameter: Params) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverPayments + params, this.httpOptions);        
  }
  getRiderPayments(inputParameter: { [x: string]: any; token?: any; }) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getRiderPayments + params, this.httpOptions);        
  }
   
  getDriverCurrentStatus(inputParameter: { [x: string]: any; token?: any; },id: string) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getDriverCurrentStatus + '/' + id + params, this.httpOptions);        
  }
  getDriverFilter(inputParameter: { [x: string]: any; token?: any; isonline?: any; },filt: string) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverFilter +'/'+filt + params, this.httpOptions);        
  }
  getRiderReviewList(inputParameter: { [x: string]: any; token?: any; },user: string | number) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getRiderReviewDetail + '/' + user + params, this.httpOptions);        
  }
  getDriverreportFilter(inputParameter: { [x: string]: any; token?: any; isonline?: any; fil?: any; year?: any; },filt: string) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverreportFilter +'/'+filt + params, this.httpOptions);        
  }
  getDriverListReport(inputParameter: { [x: string]: any; token?: any; isonline?: any; year?: any; filter?: any; },filt: string) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverListReport +'/'+filt + params, this.httpOptions);        
  }
  updateDriverPayments(inputParameter: { user_id: any[]; admin_transactionid: string; }) {
    debugger;
    return this.http.put(this.config.updateAdminpaid, JSON.stringify(inputParameter), this.httpOptions);
  }
  updateSettings(inputParameter: { radius?: string; threshold_amount?: string; max_days?: string; },inputToken: { [x: string]: any; token?: any; },id: string) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);  
    return this.http.put(this.config.updateSettings+'/'+id+params, JSON.stringify(inputParameter), this.httpOptions);
  }
  getSettings(inputToken: { [x: string]: any; token?: any; }) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.updateSettings + params, this.httpOptions);        
  }
  getDriverPayableList(inputToken: { [x: string]: any; token?: any; }) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer); 
    return this.http.get(this.config.getDriverPayable+params, this.httpOptions);
  }
  uploadImagetoServer(file: File) {
    debugger;
    //const file = files.item(0);
    const headertxt = new HttpHeaders();
    // const baseUrl = this.config.uploadLicense + '/' + staffId + '/' + filetype ;
    const baseUrl = this.config.externalImages;
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headertxt
    });
    return this.http.request(req);
  }
 
}
