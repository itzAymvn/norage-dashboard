import Link from "next/link";
import Image from "next/image";
import { User } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";

const Usercard = ({ user }: { user: User }) => {
    return (
        <div
            className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900
            p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform break-words relative"
        >
            <div className="flex flex-row space-x-2 justify-start items-center space-y-2">
                <a href={`https://namemc.com/profile/${user.minecraft_uuid}`}>
                    <Image
                        width={20}
                        height={20}
                        src={user.minecraft?.avatarURL || "/steve.png"}
                        alt={`${user.minecraft?.name}'s Avatar`}
                        className="bg-green-300 w-20 h-20 rounded-lg border-4 border-gray-600"
                    />
                </a>
                <div className="mt-2 text-1xl font-semibold text-white flex flex-col justify-center space-y-1">
                    <span>
                        <FontAwesomeIcon icon={faDiscord} className="mr-1" />
                        {user.discord?.username || "N/A"}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faCube} className="mr-1" />
                        {user.minecraft?.name || "N/A"}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
                <div className="text-gray-400 text-sm p-1 bg-gray-600 rounded-lg">
                    <span className="mr-1">Discord ID:</span>
                    <span>{user.discord_id}</span>
                </div>

                <div className="text-gray-400 text-sm p-1 bg-gray-600 rounded-lg">
                    <span className="mr-1">Minecraft UUID:</span>
                    <span>{user.minecraft_uuid}</span>
                </div>
            </div>

            <Link
                href={`/dashboard/users/${user._id}`}
                className="absolute top-0 right-0 m-2 flex flex-row space-x-2 text-gray-400 hover:text-white transition duration-200 ease-in-out p-1 rounded-lg bg-gray-700 hover:bg-gray-800"
            >
                <FontAwesomeIcon icon={faEye} />
            </Link>
        </div>
    );
};

export default Usercard;
