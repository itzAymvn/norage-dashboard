import { Achievement } from "@/app/types";
import Deleteach from "./Deleteach";

const Achievement = ({ achievement }: { achievement: Achievement }) => {
    return (
        <div
            key={achievement.name}
            className="p-4 bg-gray-800 text-white rounded-lg relative border-2 border-gray-900"
        >
            <h4 className="text-blue-500 hover:underline">
                {achievement.name}
            </h4>
            <p>{achievement.description}</p>
            <p className="text-sm">
                Date: {new Date(achievement.date).toLocaleDateString()}
            </p>
            <Deleteach achievement={achievement} />
        </div>
    );
};

export default Achievement;
