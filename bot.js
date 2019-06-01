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

function master(msg) {
	sql.query("SELECT * FROM `Valchercher1` WHERE `Server_ID` = " + msg.member.guild.id + " AND `Name_ID` = " + msg.member.id, function (err, result, fields) {
		if (err) {
			throw err;
		}
		if (result[0] != 'undefined' && result[0].Master) {
			msg.guild.members.map(member => 
					      	{if(msg.content.indexOf(member.user.username) != -1) {
							sql.query("UPDATE `Valchercher1` SET `Master` = 1 WHERE `Server_ID` = " + member.guild.id + " AND `Name_ID` = " + member.id, function (err) { if (err) throw err; });
						}});
		}
		else {
			sql.query("SELECT * FROM `Valchercher1` WHERE `Server_ID` = " + msg.member.guild.id + " AND `Master` = 1", function (err, result, fields) {
				if (err) {
					throw err;
				}
				if (typeof result[0] == 'undefined') {
					msg.guild.members.map(member => 
					      	{if(msg.content.indexOf(member.user.username) != -1)
						{
							sql.query("UPDATE `Valchercher1` SET `Master` = 1 WHERE `Server_ID` = " + member.guild.id + " AND `Name_ID` = " + member.id, function (err) { if (err) throw err; });
						}});
				}
			});
		}
	});
}


client.on('message', msg => {
        if(msg.channel.type == "text") {
		if (msg.content.indexOf("!master") != -1) {
			master(msg);
			return;
		}
        }});

client.login(process.env.BOT_KEY);
