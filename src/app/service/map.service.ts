import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';

@Injectable()
export class MapService {
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private config: Configuration) { }

    getMapsList(inputParameter: { [x: string]: any; token?: any; }) {
      //  debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.OnlineDrivers + params , this.httpOptions);
    }

    getdriverList(inputParameter: { [x: string]: any; token?: any; }){
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.driverDetails + params , this.httpOptions);
    }


}