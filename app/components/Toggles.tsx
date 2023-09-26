import { User } from "../types";
import Premium from "./Toggles/Premium";
import Blacklist from "./Toggles/Blacklist";
import Bughunter from "./Toggles/Bughunter";
import { updateUserCommands } from "../actions";
import toast from "react-hot-toast";
import Commands from "./Toggles/Commands";

const Toggles = ({ user, setUser }: { user: User; setUser: any }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-100">
            <div className="flex flex-col gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white">
                    User Preferences
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <Premium user={user} setUser={setUser} />
                    <Blacklist user={user} setUser={setUser} />
                    <Bughunter user={user} setUser={setUser} />
                </div>
                <Commands user={user} setUser={setUser} />
            </div>
        </div>
    );
};

export default Toggles;
