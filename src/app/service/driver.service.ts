import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest, HttpEvent } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';

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
getDriverList(inputParameter,statusId) {
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

  getDriverReviewList(inputParameter,user) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getDriverReviewDetail + '/' + user + params, this.httpOptions);        
  }
  deleteDriverReview(inputParameter,id) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);  
    return this.http.delete(this.config.deletedriverReview  + '/' + id + params, this.httpOptions);       
  }
  getDashboardList(inputParameter) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);   
    return this.http.get(this.config.getDashboardDetail + params, this.httpOptions);        
  }
  getDriverPayments(inputParameter) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverPayments + params, this.httpOptions);        
  }
  getRiderPayments(inputParameter) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getRiderPayments + params, this.httpOptions);        
  }
   
  getDriverCurrentStatus(inputParameter,id) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getDriverCurrentStatus + '/' + id + params, this.httpOptions);        
  }
  getDriverFilter(inputParameter,filt) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverFilter +'/'+filt + params, this.httpOptions);        
  }
  getRiderReviewList(inputParameter,user) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
  
    return this.http.get(this.config.getRiderReviewDetail + '/' + user + params, this.httpOptions);        
  }
  getDriverreportFilter(inputParameter,filt) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverreportFilter +'/'+filt + params, this.httpOptions);        
  }
  getDriverListReport(inputParameter,filt) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.getDriverListReport +'/'+filt + params, this.httpOptions);        
  }
  updateDriverPayments(inputParameter) {
    debugger;
    return this.http.put(this.config.updateAdminpaid, JSON.stringify(inputParameter), this.httpOptions);
  }
  updateSettings(inputParameter,inputToken,id) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);  
    return this.http.put(this.config.updateSettings+'/'+id+params, JSON.stringify(inputParameter), this.httpOptions);
  }
  getSettings(inputToken) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);    
    return this.http.get(this.config.updateSettings + params, this.httpOptions);        
  }
  getDriverPayableList(inputToken) {
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
