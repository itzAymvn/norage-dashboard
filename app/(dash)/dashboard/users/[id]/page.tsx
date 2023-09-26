import { getUser } from "@/app/actions";
import Achievements from "@/app/components/Achievements";
import Toggles from "@/app/components/Toggles";
import Userdata from "@/app/components/User/data";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

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
        <>
            <Userdata user={user!} />
            <Toggles user={user!} />
            <Achievements user={user!} />
            <Toaster />
        </>
    );
}
