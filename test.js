import fetch from 'node-fetch';


const body = {"type":"nuban","name":"Onyenuforo Ikenna","account_number":"0051274013","bank_code":"058","currency":"NGN"};
    fetch('https://api.paystack.co/transferrecipient', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer '+ 'sk_live_69090ec988e20a65b1a53044f962138c3cc42eb2',
            'Content-Type': 'application/json' 
        },
    }).then(reslt => {
        const tojson = reslt.json();
        //if(tojson.status === 'false')
        //{
            //result.send({"code":100,message:tojson.message});
            console.log("message: ",tojson.message);
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