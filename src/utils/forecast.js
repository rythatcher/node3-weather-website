const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1e288f3a1117111018558c5d28759668/'+latitude+','+longitude
    // question mark add parameters to query, key = value & key2 = value2
    request({url, json : true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Weather app error:' + body.error, undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary+
                ' The high today is ' + body.daily.data[0].TemperatureHigh +
                " with a low of " + body.daily.data[0].TemperatureLow +
                '. It is currently ' + body.currently.temperature + 
                ' degrees out. There is a ' + body.currently.precipProbability + 
                "% chance of rain.")
        }
    })
}

module.exports = forecast