const {Client, Events, GatewayIntentBits} = require('discord.js')
const image_search = require('g-i-s')

const token = process.env.DISCORD_TOKEN;
var prefix = "tod"

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]})


client.on("ready", c => {
	console.log("Ready");
});

client.on("messageCreate", (message) => {
    if(!message.content.startsWith("tod")) return;

    if(message.content.startsWith(`${prefix}image`)){
        let args = message.content.substring(prefix.length).split(" ");
        var keyword = args.slice(1).join(" ")
        image(message, keyword)
        message.delete()
    }
})

const image = (message, keyword) => {
    image_search(keyword, logResults)

    function logResults(error, results){
        if(error){
            console.log(error)
        }else{
            message.channel.send(results[Math.floor(Math.random() * results.length)].url)
        }
        results = []
    }
}

client.login(token)