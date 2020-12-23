import { AkairoClient, CommandHandler, ListenerHandler as EventHandler } from "discord-akairo";
import { BotOptions } from ".";
import { Message, User } from "discord.js";
import { join } from "path";
import { token } from "."

const avatarURL = (user: User) => user.displayAvatarURL({ format: "png", dynamic: true });

const lmao = (client: AkairoClient, msg: Message, prompt: string) => client.util.embed()
    .setDescription(`${msg.author}, **${prompt}**`)
    .setThumbnail(avatarURL(msg.author))
    .setColor("RANDOM");

const lmao2 = (client: AkairoClient, msg: Message, text: string) => client.util.embed()
    .setDescription(`Cancelled the command.`);

export class PresentClient extends AkairoClient {
    constructor(_token: string, public botOptions: BotOptions) {
        super({
            ownerID: ''
        },
            {
                disableMentions: 'everyone'
            });

    };

    public commandHandler = new CommandHandler(this, {
        directory: join("dist", this.botOptions.dirs.commands),
        prefix: this.botOptions.prefix,
        commandUtil: true,
        handleEdits: false,
        argumentDefaults: {
            prompt: {
                modifyStart: (msg, txt) => lmao(this, msg, txt)
            }
        },
        ignorePermissions: this.ownerID,
        ignoreCooldown: this.ownerID
    });

    public eventHandler = new EventHandler(this, {
        directory: join('dist', this.botOptions.dirs.events)
    });

    public async init() {
        await this.login(token);
        this._loadHandlers();
    };

    private _loadHandlers() {
        this.eventHandler.setEmitters({
            handler: this.commandHandler
        });
        [
            this.commandHandler,
            this.eventHandler
        ].forEach((h) => h.loadAll());
    };
};