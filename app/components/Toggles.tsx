import { User } from "../types";
import Premium from "./User/Toggles/Premium";
import Blacklist from "./User/Toggles/Blacklist";
import Bughunter from "./User/Toggles/Bughunter";
import Commands from "./User/Toggles/Commands";

const Toggles = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-100">
            <div className="flex flex-col gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white">
                    User Preferences
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <Premium user={user} />
                    <Blacklist user={user} />
                    <Bughunter user={user} />
                </div>
                <Commands user={user} />
            </div>
        </div>
    );
};

export default Toggles;
