import Users from "@/app/models/Users";
import { User } from "@/app/types";
import connectDb from "@/app/utils/Connect";
import { fetchMinecraftData, fetchDiscordData } from "@/app/utils/Fetchuser";

export async function POST(request: Request) {
    console.log("GET /api/users");
    try {
        await connectDb();
        const users = await Users.find({}, { __v: 0 });
        const clone = JSON.parse(JSON.stringify(users));

        const updatedUsers = await Promise.all(
            clone.map(async (user: User) => {
                const minecraftData = await fetchMinecraftData(
                    user.minecraft_uuid
                );
                const discordData = await fetchDiscordData(user.discord_id);

                return {
                    ...user,
                    minecraft: {
                        ...minecraftData,
                        avatarURL: `https://crafatar.com/avatars/${minecraftData.id}?overlay`,
                    },
                    discord: discordData,
                };
            })
        );

        return new Response(JSON.stringify(updatedUsers), {
            headers: { "content-type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
            status: 500,
        });
    }
}

export const dynamic = "force-dynamic";
