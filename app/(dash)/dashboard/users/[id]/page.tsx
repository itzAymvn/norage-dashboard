// Components
import Achievements from "@/app/components/Users/User/Achievements";
import Toggles from "@/app/components/Users/User/Toggles";
import Userdata from "@/app/components/Users/User/Userdata";

// Actions
import { getUser } from "@/app/actions";

// Next / Types
import { Metadata } from "next";

// Libs
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "NoRage | User",
    description: "View a user's data and manage their settings.",
};

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const { success, message, user } = await getUser(id);

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
            <Userdata user={user!} />
            <Toggles user={user!} />
            <Achievements user={user!} />
            <Toaster />
        </div>
    );
}

export const dynamic = "force-dynamic";
