import Guild from "@/app/models/Guilds";
import connectDb from "@/app/utils/Connect";

export async function POST(request: Request) {
    try {
        await connectDb();
        const guilds = await Guild.find({}, { __v: 0 });

        return new Response(JSON.stringify(guilds), {
            headers: { "content-type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                headers: { "content-type": "application/json" },
                status: 500,
            }
        );
    }
}

export const dynamic = "force-dynamic";
