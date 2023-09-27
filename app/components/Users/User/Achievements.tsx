import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/app/types";

const Achievements = ({ user }: { user: User }) => {
    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md" id="achievements">
            <h1 className="text-2xl font-bold mb-4 text-white">
                Achievements [{user.achievements.length}]
            </h1>
            {user.achievements.length === 0 ? (
                <p className="text-white">
                    This user has not earned any achievements yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {user.achievements.map((achievement) => (
                        <div
                            key={achievement.name}
                            className="p-4 bg-gray-800 text-white rounded-lg relative"
                        >
                            <h4 className="text-blue-500 hover:underline">
                                {achievement.name}
                            </h4>
                            <p>{achievement.description}</p>
                            <p className="text-sm">
                                Date:{" "}
                                {new Date(
                                    achievement.date
                                ).toLocaleDateString()}
                            </p>
                            <button className="absolute bottom-0 right-0 p-2 text-white rounded-lg hover:text-red-500 transition duration-200 ease-in-out">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Achievements;
