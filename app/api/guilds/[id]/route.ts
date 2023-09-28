import Guild from "@/app/models/Guilds";
import Blacklist from "@/app/models/Blacklist";
import connectDb from "@/app/utils/Connect";
import { fetchGuild } from "@/app/utils/Fetchserver";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        await connectDb();
        const guild = await Guild.findOne({ _id: id }, { __v: 0 });
        const guildClone = JSON.parse(JSON.stringify(guild));

        const guildData = await fetchGuild(guildClone.guild_id);
        const blacklist = await Blacklist.findOne(
            { discord_id: guildClone.guild_id },
            { __v: 0 }
        );

        return new Response(
            JSON.stringify({
                ...guildClone,
                guildData,
                blacklisted: blacklist === null ? false : true,
            }),
            {
                headers: { "content-type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                headers: { "content-type": "application/json" },
                status: 500, // Use appropriate HTTP status code
            }
        );
    }
}
