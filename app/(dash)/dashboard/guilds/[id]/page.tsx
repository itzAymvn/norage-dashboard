import { getGuild } from "@/app/actions/Guild";
import Guilddata from "@/app/components/Guilds/Guild/Guilddata";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        return (
            <div className="min-h-full flex flex-col justify-center items-center text-white">
                <FontAwesomeIcon
                    icon={faWarning}
                    className="text-9xl text-yellow-500"
                />
                <h1 className="text-4xl font-semibold mt-5">Error</h1>
                <p className="text-xl mt-2">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-5">
            <Guilddata guild={guild} />
            <Toaster />
        </div>
    );
}

export const dynamic = "force-dynamic";
