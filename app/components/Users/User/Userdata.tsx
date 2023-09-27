import { User } from "@/app/types";
import Discord from "./Userdata/Discord";
import Minecraft from "./Userdata/Minecraft";

const Userdata = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md">
            <Discord user={user} />
            <Minecraft user={user} />
        </div>
    );
};

export default Userdata;
