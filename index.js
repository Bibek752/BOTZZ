require('dotenv').config()
const Discord = require('discord.js.old');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

let f = 0;
client.on('message', msg => {
    let m = msg.content;

    if (m[0] == '!' && m.substr(1, 7) == 'weather') {
        let arg = m.substr(8, m.length - 6);
        geocode(arg, (error, data) => {
            if (error) {
                msg.reply(error);
                return;
            }
            forecast(data.latitude, data.longitude, (error, fdata) => {
                if (error) {
                    msg.reply(error);
                    return;
                }

                msg.reply(data.location);
                msg.reply(fdata.current.weather[0].description.toUpperCase());
                msg.reply(" It is currently" + fdata.current.temp + " degree celcius outside");
                msg.reply(" It feels like " + fdata.current.feels_like + " degree celcius though.")
                msg.reply("dew_point: " + fdata.current.dew_point + " celsius.")
                msg.reply("Visibility: " + fdata.current.visibility + " metres.")
                msg.reply("humidity:" + fdata.current.humidity + "%");
                msg.reply("**********");
                if (fdata.alerts) {
                    msg.reply('THERE IS A NATIONAL ALERT FOR ' + data.location.toUpperCase());
                    msg.reply(`BY-${fdata.alerts[0].sender_name}`);
                    msg.reply(fdata.alerts[0].event);
                    msg.reply(fdata.alerts[0].description);

                }
            })
        })


    }
    else if (m.length > 0 && f == 0) {
        {
            msg.reply('Here are the commands');
            msg.reply('!weather-{city/place/etc}');
            msg.reply('you have to ignore the curly braces');
            f = 1;
        }
    }


})



client.login(process.env.TOKEN);
