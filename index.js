const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on('raw', async event => {
	if (event.t === "MESSAGE_UPDATE" && event.d.embeds.length > 0) {
		const { guild_id: guild_id, channel_id: channel_id, id: id } = event.d;
		const guild = await client.guilds.fetch(guild_id);
		const channel = await guild.channels.fetch(channel_id);
		const message = await channel.messages.fetch(id);
		message.suppressEmbeds(true);
	}
});

client.login(token);
