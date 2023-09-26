export interface Achievement {
    _id: string;
    name: string;
    description: string;
    date: Date | string;
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: string;
    banner_color: string;
    avatarURL: string;
}

export interface MinecraftUser {
    id: string;
    name: string;
    properties: {
        name: string;
        value: string;
    }[];
    profileActions: any[];
    avatarURL: string;
}

export interface User {
    _id: string;
    discord_id: string;
    minecraft_uuid: string;
    bug_hunter: boolean;
    achievements: Achievement[];
    commands: number;
    premium: boolean;
    blacklisted: boolean;
    bug_hunter: boolean;
    discord?: DiscordUser;
    minecraft?: MinecraftUser;
}
