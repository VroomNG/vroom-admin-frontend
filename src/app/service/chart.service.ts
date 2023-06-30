import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';

@Injectable()
export class chartService {
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private config: Configuration) { }

    getChartList(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getChartDetail + params, this.httpOptions);
    }

    getDriverReportDetails(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.driverReportDetails + params, this.httpOptions);
    }


    getRiderReportDetails(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.riderReportDetails + params, this.httpOptions);
    }

    getDriverRevenue(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.driverRevenuesDetails + params, this.httpOptions);
    }
    getActiveDriverReport(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getActiveDriverReport + params, this.httpOptions);
    }
    getActiveRiderReport(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getActiveRiderReport + params, this.httpOptions);
    }


    // surge charge
    // add surge
    addSurgeCharge(inputParameter) {
        debugger;
        return this.http.post(this.config.addSurgePay, JSON.stringify(inputParameter), this.httpOptions);
    }

    // get all surge
    getallSurge(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getallSurgecharge + params, this.httpOptions);
    }

    updateSurgeCharge(inputParameter, id) {
        return this.http.put(this.config.editSurcharge + "/" + id, JSON.stringify(inputParameter), this.httpOptions);
    }

    // delete status
    deleteSurge(id) {
        debugger;
        return this.http.delete(this.config.deleteSurgecharge + '/' + id, this.httpOptions);
    }


    // get all surge
    getsingleSurge(id) {
        debugger;
        return this.http.get(this.config.getSingleSurcharge + "/" + id, this.httpOptions);

    }
    // Discount details
    getallDiscount(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getallDiscount + params, this.httpOptions);
    }
    addDiscount(inputParameter) {
        debugger;
        return this.http.post(this.config.getallDiscount, JSON.stringify(inputParameter), this.httpOptions);
    }
    // get all surge
    getsingleDiscount(id) {
        debugger;
        return this.http.get(this.config.getallDiscount + "/" + id, this.httpOptions);

    }
    updateDiscount(inputParameter, id) {
        return this.http.put(this.config.getallDiscount + "/" + id, JSON.stringify(inputParameter), this.httpOptions);
    }
    deleteDiscount(id) {
        debugger;
        return this.http.delete(this.config.getallDiscount + '/' + id, this.httpOptions);
    }
    getRevenueReportDetails(inputParameter) {
        debugger;
        const serializer = new DefaultUrlSerializer();
        const paramSerializer = serializer.parse('');
        paramSerializer.queryParams = inputParameter;
        const params = serializer.serialize(paramSerializer);
        return this.http.get(this.config.getRevenueReportDetails + params, this.httpOptions);
    }

}