export interface Achievement {
    _id: string;
    name: string;
    description: string;
    date: Date | string;
}

export interface User {
    _id: string;
    discord_id: string;
    discord_avatar: string;
    discord_name: string;
    minecraft_uuid: string;
    minecraft_name: string;
    minecraft_avatar: string;
    bug_hunter: boolean;
    achievements: Achievement[];
    commands: number;
    premium: boolean;
    blacklisted: boolean;
    bug_hunter: boolean;
}
