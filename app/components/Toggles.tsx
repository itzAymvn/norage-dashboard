import { User } from "../types";
import { UpdatePremium, updateBlacklist, updateBugHunter } from "../actions";

const Toggles = ({ user, setUser }: { user: User; setUser: any }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-100">
            <div className="flex flex-col gap-4 p-4 w-full bg-gray-700 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white">
                    User Preferences
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-white">Premium User</label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-6 h-6 mr-2 rounded-full border-2 border-gray-600 checked:bg-green-500"
                                checked={user.premium}
                                onChange={async () => {
                                    const data = await UpdatePremium(
                                        user.discord_id,
                                        !user.premium
                                    );

                                    if (data?.success) {
                                        setUser({
                                            ...user,
                                            premium: !user.premium,
                                        });

                                        alert(data?.message);
                                    } else {
                                        alert(data?.message);
                                    }
                                }}
                            />
                            <span className="text-gray-300">Yes</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white">Blacklisted</label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-6 h-6 mr-2 rounded-full border-2 border-gray-600 checked:bg-red-500"
                                checked={user.blacklisted}
                                onChange={async () => {
                                    const data = await updateBlacklist(
                                        user.discord_id,
                                        !user.blacklisted
                                    );

                                    if (data?.success) {
                                        setUser({
                                            ...user,
                                            blacklisted: !user.blacklisted,
                                        });

                                        alert(data?.message);
                                    } else {
                                        alert(data?.message);
                                    }
                                }}
                            />
                            <span className="text-gray-300">Yes</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white">Bug Hunter</label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-6 h-6 mr-2 rounded-full border-2 border-gray-600 checked:bg-blue-500"
                                checked={user.bug_hunter}
                                onChange={async () => {
                                    const data = await updateBugHunter(
                                        user.discord_id,
                                        !user.bug_hunter
                                    );

                                    if (data?.success) {
                                        setUser({
                                            ...user,
                                            bug_hunter: !user.bug_hunter,
                                        });

                                        alert(data?.message);
                                    } else {
                                        alert(data?.message);
                                    }
                                }}
                            />
                            <span className="text-gray-300">Yes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toggles;
