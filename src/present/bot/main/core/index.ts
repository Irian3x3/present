import { AkairoClient } from "discord-akairo";
import { Snowflake, User, Message } from "discord.js";
import { str } from "./types";

export * from "./PresentClient";
export * from "./types"
export * from "./token";

export interface BotOptions {
    dirs?: DirOptions;
    prefix?: str[] | str;
    owners?: Snowflake[];
}

interface DirOptions {
    commands?: str;
    events?: str;
}

export const alreadyMadeOptionsLmao: BotOptions = {
    dirs: {
        "commands": "commands",
        "events": "events"
    },
    prefix: "p."
};

export const avatarURL = (user: User) => {
    return user.displayAvatarURL({ format: "png", dynamic: true })
};