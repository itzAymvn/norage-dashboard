import { getGuild } from "@/app/actions";
import Guilddata from "@/app/components/Guilds/Guild/Guilddata";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
    title: "NoRage | Guild",
    description: "View a guild's data and manage their settings.",
};

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const { success, message, guild } = await getGuild(id);

    if (!success) {
        return <p className="text-red-500">{message}</p>;
    }

    return (
        <div className="flex flex-col gap-y-5">
            <Guilddata guild={guild} />
            <Toaster />
        </div>
    );
}
