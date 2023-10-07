import Users from "@/app/models/Users";
import { User } from "@/app/types";
import connectDb from "@/app/utils/Connect";
import { fetchMinecraftData, fetchDiscordData } from "@/app/utils/Fetchuser";

export async function POST(request: Request) {
    try {
        await connectDb();

        const body = await request.text();
        if (!body) {
            return new Response(JSON.stringify({ error: "No body" }), {
                headers: { "content-type": "application/json" },
                status: 400,
            });
        }
        const { page } = JSON.parse(body);

        const usersLength = await Users.countDocuments({});

        const users = await Users.find({})
            .skip((page - 1) * 10)
            .limit(10);

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
                        avatarURL: `https://mc-heads.net/avatar/${minecraftData.id}`,
                    },
                    discord: discordData,
                };
            })
        );

        return new Response(
            JSON.stringify({
                users: updatedUsers,
                total: usersLength,
                available: {
                    pages: Math.ceil(usersLength / 10),
                    users: usersLength - (page * 10 || 0),
                },
            }),
            {
                headers: { "content-type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
            status: 500,
        });
    }
}

export const dynamic = "force-dynamic";
