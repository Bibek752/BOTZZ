const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FoaWxnMjkzMSIsImEiOiJja3RiZ2wybm4wOHlmMm5tb25ybGloM3RmIn0.SCSKOrxtk6CAnVgNpBYuZg"
    request(url, (error, response, body) => {

        if (error) {
            callback('unable to connect to the service');
            return;
        }
        data = JSON.parse(body);
        //console.log(response);
        if(data.features === undefined)
        {
           return callback('NOT FOUND');
        }
        if (data.features.length === 0) {

          return   callback('unable to find location');

        }
        else {

            // console.log(data);

            callback(undefined, {
                longitude: data.features[0].geometry.coordinates[0],
                latitude: data.features[0].geometry.coordinates[1],
                location: data.features[0].place_name
            }
            )
        }

    })
}
module.exports = geocode;
