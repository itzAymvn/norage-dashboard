import Guild from "@/app/models/Guilds";
import Blacklist from "@/app/models/Blacklist";
import connectDb from "@/app/utils/Connect";
import { fetchGuild } from "@/app/utils/Fetchserver";
import mongoose from "mongoose";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    try {
        await connectDb();

        if (mongoose.isValidObjectId(id) === false) {
            return new Response(
                JSON.stringify({
                    error: "The ID you provided is not a valid mongo object ID",
                }),
                {
                    headers: { "content-type": "application/json" },
                    status: 400, // Use appropriate HTTP status code
                }
            );
        }

        const guild = await Guild.findById(
            new mongoose.Types.ObjectId(String(id))
        );

        if (guild === null) {
            return new Response(JSON.stringify({ error: "Guild not found" }), {
                headers: { "content-type": "application/json" },
                status: 404, // Use appropriate HTTP status code
            });
        }

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

export const dynamic = "force-dynamic";
