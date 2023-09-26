import { User } from "../types";
import Link from "next/link";

const Achievements = ({ user }: { user: User }) => {
    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Achievements [{user.achievements.length}]
            </h1>
            {user.achievements.length === 0 ? (
                <p className="text-white">
                    This user has not earned any achievements yet.
                </p>
            ) : (
                <div className="w-full overflow-x-auto">
                    <table className="w-full bg-gray-800 text-white">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">
                                    Description
                                </th>
                                <th className="text-left px-4 py-2">Date</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.achievements.map((achievement) => (
                                <tr key={achievement.name}>
                                    <td className="px-4 py-2">
                                        <Link
                                            href={`/achievements/${achievement._id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {achievement.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                        {achievement.description}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(
                                            achievement.date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-2 flex gap-2">
                                        <button className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
                                            Delete
                                        </button>
                                        <button className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Achievements;
