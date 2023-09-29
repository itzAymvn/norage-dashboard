import Users from "@/app/models/Users";
import Premium from "@/app/models/Premium";
import Blacklist from "@/app/models/Blacklist";
import Usercommands from "@/app/models/Usercommands";
import { fetchMinecraftData, fetchDiscordData } from "@/app/utils/Fetchuser";
import connectDb from "@/app/utils/Connect";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    console.log(`GET /api/users/${id}`);
    try {
        await connectDb();
        const user = await Users.findOne({ _id: id }, { __v: 0 });

        if (user === null) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                headers: { "content-type": "application/json" },
                status: 404, // Use appropriate HTTP status code
            });
        }

        const userClone = JSON.parse(JSON.stringify(user));
        const [minecraftData, discordData] = await Promise.all([
            fetchMinecraftData(userClone.minecraft_uuid),
            fetchDiscordData(userClone.discord_id),
        ]);

        userClone.minecraft = {
            ...minecraftData,
            avatarURL: `https://crafatar.com/avatars/${userClone.minecraft_uuid}?overlay`,
        };
        userClone.discord = discordData;

        const [premiumUser, blacklistedUser, userCommands] = await Promise.all([
            Premium.findOne({ discord_id: userClone.discord_id }),
            Blacklist.findOne({ discord_id: userClone.discord_id }),
            Usercommands.findOne({ discord_id: userClone.discord_id }),
        ]);

        userClone.premium = premiumUser !== null;
        userClone.blacklisted = blacklistedUser !== null;
        userClone.commands = userCommands?.commands || 0;

        return new Response(JSON.stringify(userClone), {
            headers: { "content-type": "application/json" },
        });
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
