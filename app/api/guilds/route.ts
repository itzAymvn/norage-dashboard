import Guild from "@/app/models/Guilds";
import { Guild as GuildType } from "@/app/types";
import { fetchGuild } from "@/app/utils/Fetchserver";
import connectDb from "@/app/utils/Connect";

export async function GET(request: Request) {
    await connectDb();
    const guilds = await Guild.find({}, { __v: 0 });
    const clone = JSON.parse(JSON.stringify(guilds));

    const updatedGuilds = [];
    for (let index = 0; index < clone.length; index++) {
        const guild = clone[index];
        console.log(
            `Fetching guild ${guild.guild_id} (${index + 1}/${clone.length})`
        );
        try {
            const guildData = await fetchGuild(guild.guild_id);

            // Introduce a delay after each iteration except the last one
            if (index < clone.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 250));
            }

            if (guildData.id) {
                updatedGuilds.push({
                    ...guild,
                    guildData,
                });
            } else {
                updatedGuilds.push({
                    ...guild,
                    guildData: {
                        iconURL: "",
                        name: "Unknown",
                        description: "Could not fetch guild data",
                        approximate_member_count: 0,
                        approximate_presence_count: 0,
                    },
                });
            }
        } catch (error: any) {
            updatedGuilds.push({
                ...guild,
                guildData: {
                    iconURL: "",
                    name: "Unknown",
                    description: "Could not fetch guild data",
                    approximate_member_count: 0,
                    approximate_presence_count: 0,
                },
            });
        }
    }

    return new Response(JSON.stringify(updatedGuilds), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}

export const revalidate = 600000; // 10 minutes
