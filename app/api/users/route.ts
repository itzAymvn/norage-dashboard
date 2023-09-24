import Users from "@/app/models/Users";

export async function GET(request: Request) {
    const users = await Users.find({});
    return new Response(JSON.stringify(users), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const { discord_id, minecraft_uuid } = await request.json();

    if (!discord_id || !minecraft_uuid) {
        return new Response(
            JSON.stringify({ error: "Missing required fields" }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    }

    // Lets make sure the user doesn't already exist
    const user = await Users.findOne({
        $or: [{ discord_id }, { minecraft_uuid }],
    });

    if (user !== null) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
            headers: { "content-type": "application/json" },
        });
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
        return new Response(JSON.stringify({ error: "Invalid discord_id" }), {
            headers: { "content-type": "application/json" },
        });
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

    // Lets create the user
    const newUser = new Users({
        discord_id,
        minecraft_uuid,
    });

    try {
        const savedUser = await newUser.save();
        return new Response(JSON.stringify(savedUser), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
        });
    }
}
