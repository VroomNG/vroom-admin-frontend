import fetch from 'node-fetch';


const body = {"SMS": {
 "auth": {
 "username": "ikenna.onyenuforo@vroomng.com",
 "apikey": "b77f4c6cab0147e5bae922732cea7a731ae034bb"
 },
 "message": {
 "sender": "Vroomng",
 "messagetext": "Testing this functionality",
 "flash": "0"
 },
 "recipients":
 {
 "gsm": [
 {
 "msidn": "2348036165791",
 "msgid": "message1"
 }
 ]
 },
 "dndsender": 1
 }};
    fetch('http://api.ebulksms.com:8080/sendsms.json', {
        method: 'post',
        body:    JSON.stringify(body)
        }).then(reslt => {
        const tojson = reslt.json();
        //if(tojson.status === 'false')
        //{
            //result.send({"code":100,message:tojson.message});
            console.log("message: ",tojson);
        //}
        /*else{
        const body2 = {"source":"balance","amount":"200","recipient":tojson.data.recipient_code};
        fetch('https://api.paystack.co/transfer', {
        method: 'post',
        body:    JSON.stringify(body2),
        headers: {
            'Authorization': 'Bearer '+ 'sk_live_69090ec988e20a65b1a53044f962138c3cc42eb2',
            'Content-Type': 'application/json' 
        },
    }).then(rex => console.log("message: ",rex.json.message));
        }*/
        
        
    })