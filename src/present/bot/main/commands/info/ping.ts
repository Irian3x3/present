import {
    Command
} from "discord-akairo";
import {
    Message
} from "discord.js"
import {
    avatarURL
} from "../../core";

export default class PingCmd extends Command {
    constructor() {
        super("ping", {
            aliases: ['ping'],
            description: {
                text: "Pings the bot",
                usage: "{:pfx}ping",
                examples: ["{:pfx}ping"]
            }
        });
    };

    async exec(message: Message) {
        return message.util.send(this.client.util.embed()
            .setAuthor(`Ping`, avatarURL(this.client.user))
            .addFields({
                name: "Message Rountrip", value: `\`\`\`${Date.now() - message.createdTimestamp} ms\`\`\``, inline: true
            },
            {
                name: "WebSocket Latency", value: `\`\`\`${Math.round(this.client.ws.ping)} ms \`\`\``, inline: true
            })
            .setColor('RANDOM'));
    };
};