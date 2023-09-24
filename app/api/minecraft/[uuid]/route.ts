export async function GET(
    request: Request,
    { params }: { params: { uuid: string } }
) {
    const { uuid } = params;

    try {
        const response = await fetch(
            `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
        );

        const data = await response.json();

        if (data?.id) {
            // get user avatar
            const avatarResponse = await fetch(
                `https://crafatar.com/avatars/${uuid}?overlay`
            );

            return new Response(
                JSON.stringify({ ...data, avatar: avatarResponse.url }),
                {
                    headers: { "content-type": "application/json" },
                }
            );
        } else {
            return new Response(JSON.stringify({ error: "User not found" }), {
                headers: { "content-type": "application/json" },
            });
        }
    } catch (err) {
        return new Response(JSON.stringify(err), {
            headers: { "content-type": "application/json" },
        });
    }
}
