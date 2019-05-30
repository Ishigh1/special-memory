const Discord = require("discord.js");
const mysql = require('mysql');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	sql = mysql.createConnection({
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASS,
		database: process.env.DATABASE
	});

	sql.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
});

client.on('message', msg => {
        if(msg.channel.type == "text") {
        }

client.login(process.env.BOT_KEY);