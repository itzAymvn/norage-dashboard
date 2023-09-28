import { User } from "@/app/types";
import Achievement from "./Achievements/Achievement";

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
                        <Achievement
                            key={achievement.name}
                            achievement={achievement}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Achievements;
