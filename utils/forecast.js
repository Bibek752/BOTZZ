const request = require('request');
//const geocode = require('./geocode');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=bf467d8063a7ba1e34fe13d568f6053c&units=metric`;

    request(url, (error, response, body) => {

        if (error) {
            callback('unable to connecto to the service');
            return;
        }
        data = JSON.parse(body);
        // console.log(data);
        if (data.cod === '400') {
            callback('nothing to geocode');
        }
        else {


            let x = data;
            callback(undefined, x);
        }
    })

}

module.exports = forecast