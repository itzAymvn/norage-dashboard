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

export const metadata: Metadata = {
    title: "NoRage | User",
    description: "View a user's data and manage their settings.",
};

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const { success, message, user } = await getUser(id);

    if (!success) {
        return <p className="text-red-500">{message}</p>;
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
