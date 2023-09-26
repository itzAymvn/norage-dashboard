import { User } from "@/app/types";
import Discord from "./Discord";
import Minecraft from "./Minecraft";

const Userdata = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-col gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <Discord user={user} />
                <Minecraft user={user} />
            </div>
        </div>
    );
};

export default Userdata;
