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

function addtobase(bdd, server_id, member_id, arg, value) {
	sql.query("SELECT * FROM `" + bdd + "` WHERE `Server_ID` = " + server_id + " AND `Name_ID` = " + member_id, function (err, result, fields) {
		if (err) {
			throw err;
		}
		if (typeof result[0] == 'undefined') {
			sql.query("INSERT INTO `" + bdd + "` (`Server_ID`, `Name_ID`, `" + arg + "`) VALUES (" + server_id + ", " + member_id + ", " + value + ")", function (err) {
					if (err) {
						throw err;
					}
				})}
		else {
			sql.query("UPDATE `Valchercher1` SET `Master` = 1 WHERE `Server_ID` = " + member.guild.id + " AND `Name_ID` = " + member.id, function (err) { if (err) throw err; });
		}
	})
}

function master(msg) {
	sql.query("SELECT * FROM `Valchercher1` WHERE `Server_ID` = " + msg.member.guild.id + " AND `Name_ID` = " + msg.member.id, function (err, result, fields) {
		if (err) {
			throw err;
		}
		test = 1;
		if (result[0] == 'undefined') {
		    echo("...");
		}
		if (result[0] !== 'undefined' && result[0].Master) {
			msg.guild.members.map(member => 
					      	{if(msg.content.indexOf(member.user.username) != -1) {
							addtobase("Valchercher1", msg.member.guild.id, msg.member.id, "Master", 1);
						}});
		}
		else {
			sql.query("SELECT * FROM `Valchercher1` WHERE `Server_ID` = " + msg.member.guild.id + " AND `Master` = 1", function (err, result, fields) {
				if (err) {
					throw err;
				}
				if (typeof result[0] == 'undefined') {
					msg.guild.members.map(member => 
					      	{if(msg.content.indexOf(member.user.username) != -1) {
							addtobase("Valchercher1", msg.member.guild.id, msg.member.id, "Master", 1);
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
