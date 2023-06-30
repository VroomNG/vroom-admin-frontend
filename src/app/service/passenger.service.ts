import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../configuration';
import { DefaultUrlSerializer } from '@angular/router';

@Injectable()
export class passengerService {
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
  getPassengerList(inputParameter,filt) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getPassengerDetail +'/'+filt+ params, this.httpOptions);
  }

  getInformedRders(inputParameter) {
    // debugger;
    // const serializer = new DefaultUrlSerializer();
    // const paramSerializer = serializer.parse('');
    // paramSerializer.queryParams = inputParameter;
    // const params = serializer.serialize(paramSerializer);
    // return this.http.get(this.config.getRidersDetail + "/inputParameter", this.httpOptions);
    return this.http.get(this.config.getRidersDetail + '/' + inputParameter);
  }

  update(inputParameter, id) {
    debugger;
    // const serializer = new DefaultUrlSerializer();
    // const paramSerializer = serializer.parse('');
    // paramSerializer.queryParams = inputParameter;
    // const params = serializer.serialize(paramSerializer);
    // return this.http.get(this.config.updatePassenger+ "/" +id + params, this.httpOptions);    
    return this.http.put(this.config.updatePassenger + "/" + id, JSON.stringify(inputParameter), this.httpOptions);

  }

  addRiders(inputParameter) {
    debugger;
    return this.http.post(this.config.addPassenger, JSON.stringify(inputParameter), this.httpOptions);

  }

  addDriver(inputParameter) {
    debugger;
    return this.http.post(this.config.addDriver, JSON.stringify(inputParameter), this.httpOptions);
  }
  schedulePush(inputParameter)
  {
  debugger;
  return this.http.post(this.config.addSchedule,JSON.stringify(inputParameter),this.httpOptions);
  }

  getSingleDriver(id) {
    // debugger;
    // const serializer = new DefaultUrlSerializer();
    // const paramSerializer = serializer.parse('');
    // paramSerializer.queryParams = inputParameter;
    // const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getSingleDriverDetail + "/" + id, this.httpOptions);
  }

  updateDriverAcc(inputParameter, id) {
    debugger;
    return this.http.put(this.config.updateAccountDet + '/' + id, JSON.stringify(inputParameter), this.httpOptions);

  }
  getTripsList(inputParameter, id) {
    if (id == 1)
      return this.http.get(this.config.getTripsDetail, this.httpOptions);
    else if (id == 2)
      return this.http.get(this.config.getTripsDetailupcoming, this.httpOptions);
    else
      return this.http.get(this.config.getTripsDetailpast, this.httpOptions);
  }
  getReferralLists()
  {
   return this.http.get(this.config.getReferrals,this.httpOptions);
  }
  getPartners()
  {
    return this.http.get(this.config.getPartners,this.httpOptions);
  }
  getSurgeParameters()
  {
    return this.http.get(this.config.getSurgeParameters,this.httpOptions);
  }
  updateSurgeParameters(inputParameter)
  {
  debugger;
  return this.http.put(this.config.updateSurgeParameters, JSON.stringify(inputParameter), this.httpOptions);
  }
  insertFeed(inputParameter)
  {
    debugger;
    return this.http.post(this.config.insertFeed, JSON.stringify(inputParameter), this.httpOptions)
  }
  getFeeds()
  {
    debugger;
    return this.http.get(this.config.getFeeds,this.httpOptions);
  }
  
  getSingleTrips(id) {
    debugger;

    return this.http.get(this.config.getSingleTripsDetail + "/" + id, this.httpOptions);
  }

  delete(id) {
    debugger;
    return this.http.delete(this.config.getRidersDetail + '/' + id, this.httpOptions);

  }
  updateDriverStatus(inputParameter, id) {
    debugger;
    return this.http.put(this.config.updateDriverStatus + '/' + id, JSON.stringify(inputParameter), this.httpOptions);
  }
  getDriverTrans(inputParameter) {
    return this.http.get(this.config.getDriverTrans, this.httpOptions);
  }
  getDriverPaymentSingle(id, inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getDriverPaymentSingle + "/" + id + params);
  }
  getDriverPaymentAdmin(id, inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.driverPaymentTransaction + "/" + id + params);
  }

  // aravi driver payment status
  updateDriverSettlements(id, inputParameter) {
    debugger;
    return this.http.put(this.config.driverPaymentPaid + '/' + id, JSON.stringify(inputParameter), this.httpOptions);
  }

  getRiderPaymentSingle(id, inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getRiderPaymentSingle + "/" + id + params);
  }
  documentUpdate(inputParameter) {
    debugger;
    return this.http.post(this.config.documentUpdate, JSON.stringify(inputParameter), this.httpOptions);
  }
  blockDriverStatus(token,inputParameter, id) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = token;
    const params = serializer.serialize(paramSerializer);   
    return this.http.put(this.config.blockDriverStatus + '/' + id + params, JSON.stringify(inputParameter), this.httpOptions);
  }
  getTripsListReport(inputParameter) {    
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
      return this.http.get(this.config.getTripsListReport+params, this.httpOptions);    
  }
  getPassengerReportList(inputParameter,filt) {
    // debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getPassengerReportList +'/'+filt+ params, this.httpOptions);
  }

  // Admin paid the settelments to Driver
  updateAdminpaid(inputParameter) {
    debugger;
    return this.http.put(this.config.updateAdminpaid, JSON.stringify(inputParameter), this.httpOptions);
  }
  // Send Warning notification to driver
  sendWarnNotification(inputParameter,token) {        
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = token;
    const params = serializer.serialize(paramSerializer);   
    return this.http.put(this.config.notificationInactive + params, JSON.stringify(inputParameter), this.httpOptions);

    
  }
  getDriverPayableList(inputParameter) {
    return this.http.get(this.config.getDriverPayable, this.httpOptions);
  }
  getCashSettlementDet(id, inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.driverCashSettlementDet + "/" + id + params);
  }
  updateCashPaid(id,inputParameter,inputToken) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);  
    return this.http.put(this.config.getDriverPayable+'/'+id+params, JSON.stringify(inputParameter), this.httpOptions);
  }
  getCashSettHistory(id, inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.driverCashSettHistory + "/" + id + params);
  }
  getWithdrawReq(inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.driverWithdrawReq + params);
  }
  getWithdrawReqtSing(id,inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.WithdrawRequestTrip+'/'+id + params);
  }
  updateWithdrawRqPaid(id,inputParameter,inputToken) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);  
    return this.http.put(this.config.driverWithdrawReq+'/'+id+params, JSON.stringify(inputParameter), this.httpOptions);
  }
  getWithdrawHistorySingle(id,inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.WithdrawHistoryList+'/'+id + params);
  }

  adminVerify(id,inputParameter, inputToken) {
    debugger;
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputToken;
    const params = serializer.serialize(paramSerializer);
    return this.http.put(this.config.updateAdminVerify + '/' + id, JSON.stringify(inputParameter), this.httpOptions);

  }
  getDriverWithdrawList(inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.driverWithdrawList + params);
  }
  getWithdrawDetails(id,inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.WithdrawDetails+'/'+id + params);
  }
  //Settlement
  getDriverSettlement(inputParameter) {
    const serializer = new DefaultUrlSerializer();
    const paramSerializer = serializer.parse('');
    paramSerializer.queryParams = inputParameter;
    const params = serializer.serialize(paramSerializer);
    return this.http.get(this.config.getDriverSettlement + params);
  }
  getSchedules()
  {
    return this.http.get(this.config.getSchedules,this.httpOptions);
  }
  getPartnerWithdraws()
  {
    return this.http.get(this.config.getPartnerWithdraws,this.httpOptions);
  }
  setPartnerPaidStatus(id)
  {
    return this.http.put(this.config.setPartnerPaid + '/' + id,this.httpOptions);
  }
  getCouponUse()
  {
    return this.http.get(this.config.getCouponUse,this.httpOptions);
  }
  getAccessLog()
  {
    return this.http.get(this.config.getAccessLog,this.httpOptions);
  }
}
