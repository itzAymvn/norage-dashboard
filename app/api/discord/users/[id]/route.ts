export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bot ${process.env.DISCORD_TOKEN}`);

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        const response = await fetch(
            `https://discord.com/api/users/${id}`,
            requestOptions
        );

        const data = await response.json();

        if (data?.id) {
            return new Response(
                JSON.stringify({
                    ...data,
                    avatarURL: `https://cdn.discordapp.com/avatars/${id}/${data.avatar}.png`,
                }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        } else {
            return new Response(JSON.stringify({ error: "User not found" }), {
                headers: { "content-type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
        });
    }
}
