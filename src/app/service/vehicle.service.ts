import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';
import { Observable } from 'rxjs';
// import {RequestOptions} from '@angular/http';  
// import { map } from 'rxjs/operators'; 
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'
@Injectable()
export class vehicleService {
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
  getVehicleList(inputParameter) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getVehicleDetail + params, this.httpOptions);
  }

  getSingleVehicle(id) {
    // debugger;
    // const serializer = new DefaultUrlSerializer();
    // const paramSerializer = serializer.parse('');
    // paramSerializer.queryParams = inputParameter;
    // const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getSingleVehicleDetail + "/" + id, this.httpOptions);
  }
  updateVehicle(inputParameter, id) {
    debugger;
    return this.http.put(this.config.updateVehicle + '/' + id, JSON.stringify(inputParameter), this.httpOptions);

  }
  addVehicle(inputParameter) {
    debugger;
    return this.http.post(this.config.addVehicle, JSON.stringify(inputParameter), this.httpOptions);

  }
  deleteVehicle(id) {
    debugger;
    return this.http.delete(this.config.deleteVehicle + '/' + id, this.httpOptions);

  }
  updateVehicleType(inputParameter, id) {
    debugger;
    return this.http.put(this.config.updateVehicleType + '/' + id, JSON.stringify(inputParameter), this.httpOptions);
  }

  postFile(id, fileToUpload: File): Observable<boolean> {
    // postFile(id,fileToUpload) {
    debugger;
    // const endpoint = '/uploads/imageLin.png';

    let headersconf = new HttpHeaders();
    // headersconf.append('Content-Type', 'multipart/form-data');
    headersconf.append('Content-Type', 'undefined');

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    // return this.http.post(this.config.uploadLicense + '/' + id , JSON.stringify(formData), this.httpOptions);   
    return this.http
      .post(this.config.uploadLicense, formData, { headers: headersconf })

      .pipe(
        //   map((res) => res.data)),
        //   catchError(error => Observable.of(null))
        // );
        map(() => { return true; })
      );
  }

  // postFile(subUri: string, id: number, fileToUpload: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   formData.append('photoalbum_id', id.toString());
  //   // ... some other .append()

  //   const customHeaders = new HttpHeaders({
  //     // 'Authorization': 'Bearer' + localStorage.getItem('token'),
  //     'Content-Type': 'multipart/form-data',
  //     'Accepted-Encoding': 'application/json'
  //   });

  //   const customOptions = {
  //     headers: customHeaders,
  //     reportProgress: true,
  //   };

  //   const req = new HttpRequest('POST', this.config.uploadLicense, formData, customOptions);

  //   // Call HttpClient.request with an HttpRequest as only param to get an observable of HttpEvents
  //   return this.http.request(req)
  //     .pipe(
  //       map((event: HttpEvent<any>) => this.getEventMessage(event)),
  //       catchError(this.handleError));
  // }

  // private getEventMessage(event: HttpEvent<any>) {
  //   // We are now getting events and can do whatever we want with them!
  //   console.log(event);
  // }

  uploadFiletoServer(file: File, staffId, filetype, leaveId) {
    const headertxt = new HttpHeaders();
    // const baseUrl = this.config.uploadLicense + '/' + staffId + '/' + filetype ;
    const baseUrl = this.config.uploadImageLincense + '/' + staffId;
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
