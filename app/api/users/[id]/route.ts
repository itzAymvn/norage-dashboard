import Users from "@/app/models/Users";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const user = await Users.findOne({ _id: id });
        if (user === null) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                headers: { "content-type": "application/json" },
            });
        }

        return new Response(JSON.stringify(user), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
        });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const validUser = await Users.findOneAndDelete({ _id: id });

        if (validUser === null) {
            return new Response(
                JSON.stringify({ success: false, error: "User not found" }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Something went wrong", data: error }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const validUser = await Users.findOne({ _id: id });

        if (validUser === null) {
            return new Response(
                JSON.stringify({ success: false, error: "User not found" }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        const body = await request.json();
        const { discord_id, minecraft_uuid } = body;

        if (!discord_id || !minecraft_uuid) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        const userExists = await Users.findOne({
            $or: [
                { discord_id: discord_id },
                { minecraft_uuid: minecraft_uuid },
            ],
        });

        if (userExists !== null) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "User with same discord id / minecraft uuid already exists",
                }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        // Lets make sure the discord_id & minecraft_uuid are valid
        const discordResponse = await fetch(
            `https://discord.com/api/users/${discord_id}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                },
            }
        );
        const discordData = await discordResponse.json();
        if (!discordData?.id) {
            return new Response(
                JSON.stringify({ error: "Invalid discord_id" }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        const minecraftResponse = await fetch(
            `https://sessionserver.mojang.com/session/minecraft/profile/${minecraft_uuid}`
        );
        const minecraftData = await minecraftResponse.json();
        if (!minecraftData?.id) {
            return new Response(
                JSON.stringify({ error: "Invalid minecraft_uuid" }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        }

        validUser.discord_id = discord_id;
        validUser.minecraft_uuid = minecraft_uuid;

        await validUser.save();

        return new Response(JSON.stringify(validUser), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Something went wrong", data: error }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    }
}
