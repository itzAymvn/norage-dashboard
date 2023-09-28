import Guild from "@/app/models/Guilds";
import { Guild as GuildType } from "@/app/types";
import { fetchGuild } from "@/app/utils/Fetchserver";
import connectDb from "@/app/utils/Connect";

export async function GET(request: Request) {
    await connectDb();
    const guilds = await Guild.find({}, { __v: 0 });
    const clone = JSON.parse(JSON.stringify(guilds));

    const updatedGuilds = await Promise.all(
        clone.map(async (guild: GuildType) => {
            const guildData = await fetchGuild(guild.guild_id);
            return {
                ...guild,
                guildData,
            };
        })
    );

    return new Response(JSON.stringify(updatedGuilds), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}

export const revalidate = 600000; // 10 minutes
