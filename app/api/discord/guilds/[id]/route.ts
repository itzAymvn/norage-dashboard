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
            `https://discord.com/api/guilds/${id}`,
            requestOptions
        );

        const data = await response.json();

        return new Response(
            JSON.stringify({
                iconURL: `https://cdn.discordapp.com/icons/${id}/${data.icon}.png`,
                ...data,
            }),
            {
                headers: { "content-type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { "content-type": "application/json" },
        });
    }
}
